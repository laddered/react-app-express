import React, {Component} from 'react';
import {Link} from "react-router-dom";

class UserHeaderBTN extends Component {

    deleteToken = ()=>{
        localStorage.removeItem('tokenReactStore');
        this.forceUpdate();
    };

    render(){
        return(
            <React.Fragment>
            <Link className="sign-in-btn" to='/userEdit'>
                User
            </Link>
                <Link onClick={this.deleteToken} className="log-in-btn" to=''>
                    Log out
                </Link>
            </React.Fragment>
        );
    };
}

export {UserHeaderBTN};