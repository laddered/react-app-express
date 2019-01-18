import React, {Component} from 'react';
import {Link} from "react-router-dom";

class UserHeaderBTN extends Component {

    state = {
        user: null,
        token: false
    };

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

export {UserHeaderBTN};