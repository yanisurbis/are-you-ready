import React, { Component } from 'react';

class User extends Component {
  render() {
    const {ready, name, isAdmin, uid} = this.props.user
    const { onReadyClick, currentUserUID } = this.props
    console.log(onReadyClick)
    if (isAdmin) return null
    return (
      <div>
        {ready
          ? <span style={{color: 'green'}}>{name}</span>
          : <span style={{color: 'red'}}>{name}</span>
        }
        {!ready && currentUserUID === uid && <button onClick={onReadyClick}>I'm ready</button>}
      </div>
    );
  }
}

export default User;