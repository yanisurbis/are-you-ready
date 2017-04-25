// @flow
import React, {Component} from 'react';
import User from './User';
import R from 'ramda';

class CurrentPoll extends Component {
  render() {
    const users = R.toPairs(this.props.poll.users).map(elm => elm[1]);
    const {currentUserUID, onReadyClick} = this.props;
    return (
      <div>
        <h1>Current Poll</h1>
        {users.map(user => (
          <User
            key={user.uid}
            user={user}
            currentUserUID={currentUserUID}
            onReadyClick={onReadyClick}
          />
        ))}
      </div>
    );
  }
}

export default CurrentPoll;
