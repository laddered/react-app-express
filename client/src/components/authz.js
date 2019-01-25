import React, {Component} from 'react';
import {Link} from "react-router-dom";

class AuthzWindow extends Component {

    state = {
        login: '',
        password: '',
        wrongLogin: false,
        wrongPassword: false,
    };

    loginValidate = (e)=>{
        this.setState({
            [e.target.name]: e.target.value,
            wrongLogin: false
        });
    };

    passwordValidate = (e)=>{
        this.setState({
            [e.target.name]: e.target.value,
            wrongPassword: false
        });
    };

    onSubmit = async () => {
        const response = await fetch('/authz/signIn', {
            method: "POST",
            dataType: "JSON",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({
                login:this.state.login,
                password:this.state.password
            })
        });
        const body = await response.json();
        console.log(body);

        switch (response.status) {
            case 404:
                this.setState({
                    wrongLogin: true
                });
                console.log(body.message);
                break;
            case 400:
                this.setState({
                    wrongPassword: true
                });
                console.log(body.message);
                break;
            case 200:
                localStorage.setItem('tokenReactStore', body.token);
                console.log('User is authorized!');
                this.props.history.push('/');
                break;
            default:
                throw Error(body.message);
        }
    };

    render(){
        return(
            <div className="authz-window">
                <Link to='/' className="homeLink"><strong>ReactStore</strong></Link>
                <div className='input-div'>
                    <input name='login'
                           className='input-reg' type='text' maxLength='15'
                           placeholder='Enter your login'
                    onChange={e => this.loginValidate(e)}/></div>
                <div className={this.state.wrongLogin ? 'input-error' : 'input-error-none' }>Login not registered</div>

                <div className='input-div'>
                    <input name='password'
                           className='input-reg' type='password' maxLength='15'
                           placeholder='Enter your password'
                           onChange={e => this.passwordValidate(e)}/></div>
                <div className={this.state.wrongPassword ? 'input-error' : 'input-error-none' }>Invalid password</div>

                <button onClick={this.onSubmit} className='submit-btn'><strong>Log in!</strong></button>
                <div><Link to='/reg' className="reg-auth-link">I do not have an account yet</Link></div>
            </div>
        );
    };
}

export {AuthzWindow};