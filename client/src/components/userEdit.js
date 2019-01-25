import React, {Component} from 'react';
import {Link} from "react-router-dom";
import ReactModal from 'react-modal';
import ReactDOM from 'react-dom';

class EditWindow extends Component {
    state = {
        oldLogin:'',
        newLogin:'',
        newLoginInvalid:false,
        newLoginMatch:false,

        newEmail:'',
        newEmailInvalid:false,

        newPassword:'',
        newPasswordInvalid:false,
        newPasswordConfirm:'',
        newPasswordConfirmInvalid:false,

        passwordForConfirm:'',
        passwordForConfirmWrong:false,
        action:'',
        modalOpen:false
    };

    componentDidMount() {
        this.findUser()
            .then(res => this.setState({oldLogin: res.login, oldEmail: res.email}))
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
                    throw Error();
            }
        }
        else {
            this.props.history.push('/');
        }
    };

    loginValidate = (e)=>{
        this.setState({
            [e.target.name]: e.target.value,
            newLoginMatch:false,
            newLoginInvalid:false,
        });
    };

    emailInput = (e)=>{
        this.setState({
            [e.target.name]: e.target.value,
            newEmailInvalid:false,
        });
    };

    passwordInput = (e)=>{
        this.setState({
            [e.target.name]: e.target.value,
            newPasswordInvalid:false,
            newPasswordConfirmInvalid:false
        });
    };

    passwordConfirmInput = (e)=>{
        this.setState({
            [e.target.name]: e.target.value,
            newPasswordConfirmInvalid:false
        });
    };

    stateInput = (e)=>{
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    passwordForConfirmInput = (e)=>{
        this.setState({
            [e.target.name]: e.target.value,
            passwordForConfirmWrong:false
        });
    };

    onSave = async () => {
        const response = await fetch('/user/editMe', {
            method: "POST",
            dataType: "JSON",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({
                token:localStorage.getItem('tokenReactStore'),
                oldLogin:this.state.oldLogin,
                newLogin:this.state.newLogin,
                newEmail:this.state.newEmail,
                newPassword:this.state.newPassword,
                newPasswordConfirm:this.state.newPasswordConfirm,

                passwordForConfirm:this.state.passwordForConfirm
            })
        });
        const body = await response.json();
        if (response.status !== 200) {
            throw Error()
        }
        else {
            console.log(body);
            if(body.data.oldPasswordWrong){
                this.setState({passwordForConfirmWrong:true})
            } else{

                if(body.data.loginMatch){
                    this.setState({newLoginMatch:true})
                } else {
                    if(body.data.loginValid){
                        ReactDOM.findDOMNode(this.refs.loginRef).value = '';
                        this.findUser().then(res => this.setState({oldLogin: res.login, newLogin:''}))
                            .catch(err => console.log(err));
                    }
                    else {this.setState({newLoginInvalid:true})}
                }

                if(body.data.emailValid){
                    ReactDOM.findDOMNode(this.refs.emailRef).value = '';
                    this.findUser().then(res => this.setState({oldEmail: res.email, newEmail:''}))
                        .catch(err => console.log(err));
                }
                else {this.setState({newEmailInvalid:true})}

                if(body.data.passwordConfirmValid){
                    if(body.data.passwordValid){
                        ReactDOM.findDOMNode(this.refs.passwordRef).value = '';
                        ReactDOM.findDOMNode(this.refs.passwordConfirmRef).value = '';
                    } else {
                        this.setState({newPasswordInvalid:true})
                    }
                } else {
                    this.setState({newPasswordConfirmInvalid:true})
                }
                this.setState({passwordForConfirmWrong:false, modalOpen:false})
            }


        }

    };

    onCancel = ()=>{
        this.setState({
            action:'',
            modalOpen:false,
            passwordForConfirmWrong: false
        })
    };

    editAccountBTN = ()=>{
        this.setState({
            action:'edit',
            modalOpen:true
        })
    };

    deleteAccountBTN = ()=>{
        this.setState({
            action:'delete',
            modalOpen:true
        })
    };

    saveOrDelete = ()=>{
        if (this.state.action === 'edit') {
           this.onSave()
        }
        else {
            this.onSave()
        }
    };

    render(){
        return(
            <div className="reg-window">
                <Link to='/' className="homeLink"><strong>ReactStore</strong></Link>
                <div className='input-div'>
                    <h1>User edit:</h1>
                    <input name='newLogin' ref="loginRef"
                           className={this.state.newLoginInvalid ? 'input-reg-invalid' : 'input-reg' } type='text' maxLength='15'
                           placeholder={this.state.oldLogin}
                           title={"Your current login is " + this.state.oldLogin + ". New login must contain one word in the Latin alphabet without spaces, not starting with a number"}
                           onChange={e => this.loginValidate(e)}
                    />
                </div>
                <div className={this.state.newLoginMatch ? 'input-error-warning' : 'input-error-none' }>This login already in use by another user!</div>
                <div className={this.state.newLoginInvalid ? 'input-error' : 'input-error-none' }>Invalid login</div>

                <div className='input-div'>
                    <input name='newEmail' ref="emailRef"
                           className={this.state.newEmailInvalid ? 'input-reg-invalid' : 'input-reg' } type='email' maxLength='30'
                           placeholder={this.state.oldEmail}
                           title={"Your current email is " + this.state.oldEmail + ". The left part indicates the name of the mailbox @ the right part of the address specifies the domain name of the server on which the mailbox is located"}
                           onChange={e => this.emailInput(e)}
                    />
                </div>
                <div className={this.state.newEmailInvalid ? 'input-error' : 'input-error-none' }>Invalid email</div>

                <div className='input-div'>
                    <input name='newPassword' ref="passwordRef"
                           className={this.state.newPasswordInvalid ? 'input-reg-invalid' : 'input-reg' } type='password' maxLength='15'
                           placeholder='Enter new password'
                           title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                           onChange={e => this.passwordInput(e)}
                    />
                </div>
                <div className={this.state.newPasswordInvalid ? 'input-error' : 'input-error-none' }>Invalid password</div>

                <div className='input-div'>
                    <input name='newPasswordConfirm' ref="passwordConfirmRef"
                           className={this.state.newPasswordConfirmInvalid ? 'input-reg-invalid' : 'input-reg' } type='password' maxLength='15'
                           placeholder='Enter new password again'
                           title="Re-enter the password for confirmation"
                           onChange={e => this.passwordConfirmInput(e)}
                    />
                </div>
                <div className={this.state.newPasswordConfirmInvalid ? 'input-error' : 'input-error-none' }>Password mismatch</div>

                <button className='submit-btn'
                        onClick={this.editAccountBTN}
                ><strong>Save changes</strong></button>

                <br/><br/>
                <div>*If you do not want to change the value of the field, leave it blank.</div>

                <button className='submit-btn'
                        onClick={this.deleteAccountBTN}
                ><strong>Delete account</strong></button>

                <ReactModal isOpen={this.state.modalOpen}
                            className="regModalContent"
                            role="dialog"
                            overlayClassName="regModalOverlay"
                            ariaHideApp={false}
                            bodyOpenClassName="regModalBodyOpen">
                    <strong>Confirm changes:</strong>
                    <br/><br/>
                    <input name='passwordForConfirm'
                           className={this.state.passwordForConfirmWrong ? 'input-reg-invalid' : 'input-reg' } type='password' maxLength='15'
                           placeholder='Enter your password to confirm'
                           title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                           onChange={e => this.passwordForConfirmInput(e)}
                    />
                    <div className={this.state.passwordForConfirmWrong ? 'input-error-warning' : 'input-error-none' }>Wrong password!</div>
                    <button className='submit-btn-inline' onClick={this.saveOrDelete}>Submit</button>
                    <button className='submit-btn-inline' onClick={this.onCancel}>Cancel</button>

                </ReactModal>

            </div>
        );
    };
}

export {EditWindow};