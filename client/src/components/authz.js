import React, {Component} from 'react';
import {Link} from "react-router-dom";

class AuthWindow extends Component {
    render(){
        return(
            <div className="auth-window">
                <Link to='/' className="homeLink"><strong>ReactStore</strong></Link>
                <div className='input-div'><input className='input-reg' type='text' maxLength='15' required placeholder='Enter your login'/></div>
                <div className='input-div'><input className='input-reg' type='password' maxLength='15' required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" placeholder='Enter your password'/></div>

                <button className='submit-btn'><strong>Log in!</strong></button>
                <div><Link to='/reg' className="reg-auth-link">I do not have an account yet</Link></div>
            </div>
        );
    };
}

export {AuthWindow};