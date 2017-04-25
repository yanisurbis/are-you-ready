import React, {Component} from 'react';
import {auth, database} from './firebase';
import Login from './Login';
import uuidV4 from 'uuid/v4';
import R from 'ramda';

import CurrentPoll from './CurrentPoll'

function secondsBetwDates(a, b) {
  return parseInt((b-a)/1000);
}

class App extends Component {
  state = {
    user: null,
    currentPoll: {
      users: [],
    },
  };

  isAdmin = false

  constructor(props) {
    super(props);

    this.pollsRef = database.ref('/polls');
    this.currentPollRef = database.ref('/currentPoll');
    this.adminsEmailsRef = database.ref('/adminsEmails');
  }

  componentDidMount() {
    auth.onAuthStateChanged(({uid, displayName: name, email}) => {
      // add user to state
      let user = {uid, name, email, ready: false, isAdmin: false}

      
      this.adminsEmailsRef
        .once('value')
        .then(snapshot => snapshot.val())
        .then(emails => R.contains(user.email, emails))
        .then(isAdmin => {
          if (isAdmin) {
            user = {...user, isAdmin: true, ready: true}
            this.currentPollRef.child(`users/${user.uid}`).set(user);
            this.currentPollRef.child('started').set((new Date()).toLocaleString())
          } else {
            this.currentPollRef.child(`users/${user.uid}`).set(user);
          }
          this.setState({user})
        });

      // every time currentPoll is changed => update state
      this.currentPollRef.on('value', snapshot => {
        const currentPoll = snapshot.val()

        // if we have no data in currentPoll => add without thinking
        if (!currentPoll) {
          this.currentPollRef.child(`users/${user.uid}`).set(user);
        // if we have data in currentPoll
        } else {
          this.setState({currentPoll})
          // close current poll if necs (if user is admin)
          if (user.isAdmin) {
            const closePoll = R.all(user => user.ready, R.values(currentPoll.users))
            if (closePoll && secondsBetwDates(new Date(currentPoll.started), new Date()) > 5) {
                const id = uuidV4()
                // add current poll to prev polls
                this.pollsRef.child(id).set({...currentPoll, id, ended: (new Date()).toLocaleString()})
                // clear current poll
                this.currentPollRef.set({
                  started: (new Date()).toLocaleString()
                })
            }
          }
          
          const haveUser = currentPoll.users && R.has(user.uid, currentPoll.users)
          console.log("Have user")
          console.log(haveUser)
          if (!haveUser) {
            this.currentPollRef.child(`users/${user.uid}`).set(user); 
          }
        }
      })
    });
  }

  onReadyClick = () => {

    console.log("I'm here")
    console.log(this.state.user.uid)
    this.currentPollRef
      .child(`users/${this.state.user.uid}`)
      .child(`ready`)
      .set(true)
  }

  render() {
    const {user, currentPoll} = this.state;
    return (
      <div>
        <Login user={user} />
        {user 
          ? (
            <div>
              <h1>Your name is {user.name}</h1>
              <CurrentPoll
                poll={currentPoll}
                currentUserUID={user.uid}
                onReadyClick={this.onReadyClick}
              />
            </div>
          )
          : <h1>Please Log In</h1>
        }
      </div>
    );
  }
}

export default App;
