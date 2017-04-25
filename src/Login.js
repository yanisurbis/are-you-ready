import React, { Component } from 'react'
import { auth, googleAuthProvider } from './firebase'

class Login extends Component {
    loginWithGoogle = () => {
        auth.signInWithPopup(googleAuthProvider)
    }

    logOut = () => {
        auth.logOut()
    }

    render() {
        const { user } = this.props
        return (
            <div>
            { user 
                ? (
                    <button className="warn" onClick={this.logOut}>
                        Log Out
                    </button>
                )
                : (
                    <button className="" onClick={this.loginWithGoogle}>
                        Log In
                    </button>
                )
            }
            </div>
        )
    }
}

export default Login