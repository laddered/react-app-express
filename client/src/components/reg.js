import React, {Component} from 'react';
import {Link} from "react-router-dom";
import ReactModal from 'react-modal';

class RegWindow extends Component {
    state = {
        login: '',
        email: '',
        password: '',
        passwordConfirm:'',
        loginValid: false,
        emailValid: false,
        passwordValid: false,
        passwordConfirmValid: false,
        submitDisable:true,
        loginMatch:false,
        modalOpen:false
    };

    loginValidate = (e)=>{
        let regExp = /^[A-Za-z]+[A-Za-z0-9]+$/;
        this.setState({
            [e.target.name]: e.target.value,
            loginValid: regExp.test(e.target.value),
            loginMatch: false
        });
    };

    emailValidate = (e)=>{
        let regExp = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,3}$/;
        this.setState({
            [e.target.name]: e.target.value,
            emailValid: regExp.test(e.target.value)
        });
    };

    passwordValidate = (e)=>{
        let regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
        this.setState({
            [e.target.name]: e.target.value,
            passwordValid: regExp.test(e.target.value),
            passwordConfirmValid: this.state.passwordConfirm === e.target.value
        });
    };

    passwordConfirmValidate = (e)=>{
        this.setState({
            [e.target.name]: e.target.value,
            passwordConfirmValid: this.state.password === e.target.value
        });
    };

    onSubmit = async () => {
        const response = await fetch('/authz/createUser', {
            method: "POST",
            dataType: "JSON",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({
                login:this.state.login,
                email:this.state.email,
                password:this.state.password
            })
        });
        const body = await response.json();
        console.log(body);

        if (response.status !== 200) {
            if (response.status === 409) {
                this.setState({
                    loginMatch: true
                })
            } else {
                throw Error(body.message)
            }
        }
        else {
            this.setState({
                modalOpen:true
            });
            console.log(body.message);
        }
    };

    modalOk = ()=>{
        this.props.history.push('/auth');
    };

    render(){
        this.state.submitDisable = !(this.state.loginValid && this.state.emailValid && this.state.passwordValid && this.state.passwordConfirmValid);
        return(
            <div className="reg-window">
                <Link to='/' className="homeLink"><strong>ReactStore</strong></Link>
                    <div className='input-div'>
                        <input name='login'
                            className={this.state.loginValid ? 'input-reg' : 'input-reg-invalid' } type='text' maxLength='15'
                               placeholder='Enter your login'
                               title="Must contain one word in the Latin alphabet without spaces, not starting with a number"
                               onChange={e => this.loginValidate(e)}
                               value={this.state.login}
                        />
                    </div>
                <div className={this.state.loginMatch ? 'input-error-warning' : 'input-error-none' }>This login already in use by another user!</div>
                <div className={this.state.loginValid ? 'input-error-none' : 'input-error' }>Invalid login</div>

                    <div className='input-div'>
                        <input name='email'
                            className={this.state.emailValid ? 'input-reg' : 'input-reg-invalid' } type='email' maxLength='30'
                               placeholder='Enter your email'
                               title="The left part indicates the name of the mailbox @ the right part of the address specifies the domain name of the server on which the mailbox is located"
                               onChange={e => this.emailValidate(e)}
                               value={this.state.email}
                               />
                    </div>
                <div className={this.state.emailValid ? 'input-error-none' : 'input-error' }>Invalid email</div>

                <div className='input-div'>
                        <input name='password'
                            className={this.state.passwordValid ? 'input-reg' : 'input-reg-invalid' } type='password' maxLength='15'
                               placeholder='Enter your password'
                               title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                               onChange={e => this.passwordValidate(e)}
                               value={this.state.password}
                               />
                    </div>
                <div className={this.state.passwordValid ? 'input-error-none' : 'input-error' }>Invalid password</div>

                <div className='input-div'>
                    <input name='passwordConfirm'
                        className={this.state.passwordConfirmValid ? 'input-reg' : 'input-reg-invalid' } type='password' maxLength='15'
                           placeholder='Enter your password again'
                           title="Re-enter the password for confirmation"
                           onChange={e => this.passwordConfirmValidate(e)}
                           value={this.state.passwordConfirm}
                    />
                </div>
                <div className={this.state.passwordConfirmValid ? 'input-error-none' : 'input-error' }>Password mismatch</div>

                <button className='submit-btn'
                        disabled={this.state.submitDisable}
                        onClick={this.onSubmit}
                ><strong>Sign up!</strong></button>
                <div><Link to='/auth' className="reg-auth-link">I already have an account</Link></div>
                <ReactModal isOpen={this.state.modalOpen}
                            className="regModalContent"
                            role="dialog"
                            overlayClassName="regModalOverlay"
                            ariaHideApp={false}
                            bodyOpenClassName="regModalBodyOpen">
                    <strong>Account has been registered!</strong>
                    <br/>
                    <button className='submit-btn' onClick={this.modalOk}>Ok</button>
                </ReactModal>
            </div>
        );
    };
}

export {RegWindow};