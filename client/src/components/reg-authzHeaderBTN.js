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

export {RegAndAuthzBTN};