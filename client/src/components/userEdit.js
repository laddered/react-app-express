import React, {Component} from 'react';
import {Link} from "react-router-dom";

class EditWindow extends Component {
    state = {
        oldLogin:'',
        oldEmail:'',
        login:'',
        email:'',
        loginValid:true,
        emailValid:true,
        loginMatch:false,

        oldPassword:'',
        newPassword:'',
        newPasswordConfirm:'',
        oldPasswordValid: false,
        oldPasswordWrong:false,
        passwordValid:false,
        passwordConfirmValid:true,

        passwordForDelete:'',
        passwordForDeleteValid:false,
        passwordForDeleteWrong:false
    };

    componentDidMount() {
        this.findUser()
            .then(res => this.setState({login: res.login, email: res.email, oldLogin: res.login, oldEmail: res.email}))
            .catch(err => console.log(err));
    }

    findUser = async () => {
        if (localStorage.getItem('tokenReactStore') !== null) {
            let data = localStorage.getItem('tokenReactStore');
            const response = await fetch('/user/getMe', {
                method: "POST",
                dataType: "JSON",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({token:data})
            });
            const body = await response.json();

            switch (response.status) {
                case 500:
                    localStorage.removeItem('tokenReactStore');
                    this.props.history.push('/');
                    break;
                case 200:
                    return body;
                default:
                    throw Error(body.message);
            }
        }
        else {
            this.props.history.push('/');
        }
    };

    loginValidate = (e)=>{
        let regExp = /^[A-Za-z]+[A-Za-z0-9]+$/;
        this.setState({
            [e.target.name]: e.target.value,
            loginValid: regExp.test(e.target.value),
            loginMatch:false
        });
    };

    emailValidate = (e)=>{
        let regExp = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,3}$/;
        this.setState({
            [e.target.name]: e.target.value,
            emailValid: regExp.test(e.target.value)
        });
    };

    oldPasswordValidate = (e)=>{
        let regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
        this.setState({
            [e.target.name]: e.target.value,
            oldPasswordValid: regExp.test(e.target.value)
        });
    };

    passwordValidate = (e)=>{
        let regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
        this.setState({
            [e.target.name]: e.target.value,
            passwordValid: regExp.test(e.target.value),
            passwordConfirmValid: this.state.newPasswordConfirm === e.target.value
        });
    };

    passwordConfirmValidate = (e)=>{
        this.setState({
            [e.target.name]: e.target.value,
            passwordConfirmValid: this.state.newPassword === e.target.value
        });
    };

    passwordForDeleteValidate = (e)=>{
        let regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
        this.setState({
            [e.target.name]: e.target.value,
            passwordForDeleteValid: regExp.test(e.target.value)
        });
    };

    loginOrEmailEdit = async () => {
        let data = {
            token:localStorage.getItem('tokenReactStore'),
            login:this.state.login,
            email:this.state.email,
        };
        const response = await fetch('/user/editMe', {
            method: "POST",
            dataType: "JSON",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(data)
        });
        const body = await response.json();
        console.log(body);

        if (response.status !== 200) {
            throw Error(body.message)
        }
        else {
            switch (response.resCode) {
                case '5':
                    localStorage.removeItem('tokenReactStore');
                    this.props.history.push('/');
                    break;
                case '2':
                    this.findUser().then(res => this.setState({login: res.login, email: res.email}))
                        .catch(err => console.log(err));
                    break;
                case '3':
                    this.setState({loginMatch:true});
                    break;
                default:
                    throw Error(body.message);
            }
        }
    };

    passwordEdit = async () => {
        let data = {
            oldPassword:this.state.oldPassword,
            newPassword:this.state.newPassword
        };
        const response = await fetch('/user/editMyPassword', {
            method: "POST",
            dataType: "JSON",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(data)
        });
        const body = await response.json();
        console.log(body);

        if (response.status !== 200) {
            throw Error(body.message)
        }
        else {
            localStorage.setItem('tokenReactStore', body.token);
            console.log('User created!');
        }
    };

    deleteAccount = async () => {
        let data = {
            passwordForDelete:this.state.passwordForDelete
        };
        const response = await fetch('/user/deleteMe', {
            method: "POST",
            dataType: "JSON",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(data)
        });
        const body = await response.json();
        console.log(body);

        if (response.status !== 200) {
            throw Error(body.message)
        }
        else {
            localStorage.setItem('tokenReactStore', body.token);
            console.log('User created!');
        }
    };

    render(){
        return(
            <div className="reg-window">
                <Link to='/' className="homeLink"><strong>ReactStore</strong></Link>
                <div className='input-div'>
                    <h1>User edit:</h1>
                    <input name='login'
                           className={this.state.loginValid ? 'input-reg' : 'input-reg-invalid' } type='text' maxLength='15'
                           placeholder='Enter your new login'
                           title={"Your old login is " + this.state.oldLogin + ". New login must contain one word in the Latin alphabet without spaces, not starting with a number"}
                           onChange={e => this.loginValidate(e)}
                           value={this.state.login}
                    />
                </div>
                <div className={this.state.loginMatch ? 'input-error-warning' : 'input-error-none' }>This login already in use by another user!</div>
                <div className={this.state.loginValid ? 'input-error-none' : 'input-error' }>Invalid login</div>

                <div className='input-div'>
                    <input name='email'
                           className={this.state.emailValid ? 'input-reg' : 'input-reg-invalid' } type='email' maxLength='30'
                           placeholder='Enter your new email'
                           title={"Your old email is " + this.state.oldEmail + ". The left part indicates the name of the mailbox @ the right part of the address specifies the domain name of the server on which the mailbox is located"}
                           onChange={e => this.emailValidate(e)}
                           value={this.state.email}
                    />
                </div>
                <div className={this.state.emailValid ? 'input-error-none' : 'input-error' }>Invalid email</div>

                <button className='submit-btn'
                        disabled={!(this.state.loginValid && this.state.emailValid)}
                        onClick={this.loginOrEmailEdit}
                ><strong>Save changes</strong></button>



                <br/><br/>
                <h1>Password edit:</h1>
                <div className='input-div'>
                    <input name='oldPassword'
                           className={this.state.oldPasswordValid ? 'input-reg' : 'input-reg-invalid' } type='password' maxLength='15'
                           placeholder='Enter old password'
                           title="Enter your old password here to replace it with a new one"
                           onChange={e => this.oldPasswordValidate(e)}
                           value={this.state.oldPassword}
                    />
                </div>
                <div className={this.state.oldPasswordValid ? 'input-error-none' : 'input-error' }>Invalid password</div>
                <div className={this.state.oldPasswordWrong ? 'input-error-warning' : 'input-error-none' }>Wrong password!</div>

                <div className='input-div'>
                    <input name='newPassword'
                           className={this.state.passwordValid ? 'input-reg' : 'input-reg-invalid' } type='password' maxLength='15'
                           placeholder='Enter new password'
                           title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                           onChange={e => this.passwordValidate(e)}
                           value={this.state.newPassword}
                    />
                </div>
                <div className={this.state.passwordValid ? 'input-error-none' : 'input-error' }>Invalid password</div>

                <div className='input-div'>
                    <input name='newPasswordConfirm'
                           className={this.state.passwordConfirmValid ? 'input-reg' : 'input-reg-invalid' } type='password' maxLength='15'
                           placeholder='Enter new password again'
                           title="Re-enter the password for confirmation"
                           onChange={e => this.passwordConfirmValidate(e)}
                           value={this.state.newPasswordConfirm}
                    />
                </div>
                <div className={this.state.passwordConfirmValid ? 'input-error-none' : 'input-error' }>Password mismatch</div>

                <button className='submit-btn'
                        disabled={!(this.state.oldPasswordValid && this.state.passwordValid && this.state.passwordConfirmValid)}
                        onClick={this.passwordEdit}
                ><strong>Change password</strong></button>



                <br/><br/>
                <h1>Account delete:</h1>
                <div className='input-div'>
                    <input name='passwordForDelete'
                           className={this.state.passwordForDeleteValid ? 'input-reg' : 'input-reg-invalid' } type='password' maxLength='15'
                           placeholder='Enter your password to delete account'
                           title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                           onChange={e => this.passwordForDeleteValidate(e)}
                    />
                </div>
                <div className={this.state.passwordForDeleteValid ? 'input-error-none' : 'input-error' }>Invalid password</div>
                <div className={this.state.passwordForDeleteWrong ? 'input-error-warning' : 'input-error-none' }>Invalid password</div>

                <button className='submit-btn'
                        disabled={!(this.state.passwordForDeleteValid)}
                        onClick={this.deleteAccount}
                ><strong>Delete account</strong></button>

            </div>
        );
    };
}

export {EditWindow};