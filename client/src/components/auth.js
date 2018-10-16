import React, {Component} from 'react';
import {Link} from "react-router-dom";

class AuthWindow extends Component {
    render(){
        return(
            <div className="auth-window">
                <Link to='/' className='homeLink'>ReactStore</Link>
            </div>
        );
    };
}

export {AuthWindow};