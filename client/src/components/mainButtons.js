import React, {Component} from 'react';
import {Link} from "react-router-dom";

class SignInBTN extends Component {
    render(){
        return(
            <Link className="sign-in-btn" to='/reg'>
                Sign up
            </Link>
        );
    };
}

class LogInBTN extends Component {
    render(){
        return(
            <Link className="log-in-btn" to='/auth'>
                Log in
            </Link>
        );
    };
}

export {SignInBTN, LogInBTN};