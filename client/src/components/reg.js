import React, {Component} from 'react';
import {Link} from "react-router-dom";

class RegWindow extends Component {
    render(){
        return(
            <div className="reg-window">
                <Link to='/' className="homeLink">ReactStore</Link>
                    <div className='input-div'><input className='input-reg' type='text' maxLength='15' required placeholder='Enter your login'/></div>
                    <div className='input-div'><input className='input-reg' type='email' maxLength='20' required pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,3}$" placeholder='Enter your email'/></div>
                    <div className='input-div'><input className='input-reg' type='password' maxLength='15' required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" placeholder='Enter your password'/></div>
                <button className='submit-btn'><strong>Sign up!</strong></button>
            </div>
        );
    };
}

export {RegWindow};