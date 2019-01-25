import React, {Component} from 'react';
import {Link} from "react-router-dom";

class RegAndAuthzBTN extends Component {
    render(){
        return(
            <React.Fragment>
                <Link className="sign-in-btn" to='/reg'>
                    Sign up
                </Link>
                <Link className="log-in-btn" to='/auth'>
                    Log in
                </Link>
            </React.Fragment>
        );
    };
}

class UserHeaderBTN extends Component {

    deleteToken = ()=>{
        localStorage.removeItem('tokenReactStore');
        this.props.tokenDelete()
    };

    render(){
        return(
            <React.Fragment>
            <Link className="sign-in-btn" to='/editMe'>
                {this.props.user}
            </Link>
                <Link onClick={this.deleteToken} className="log-in-btn" to=''>
                    Log out
                </Link>
            </React.Fragment>
        );
    };
}

export {RegAndAuthzBTN, UserHeaderBTN};