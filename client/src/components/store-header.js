import React, {Component} from 'react';
import {Route} from "react-router-dom";
import {MainColumns} from "./column";
import {AuthzWindow} from "./authz";
import {RegWindow} from "./reg";
import {EditWindow} from "./userEdit";
import {RegAndAuthzBTN} from "./reg-authzHeaderBTN";
import {UserHeaderBTN} from "./userHeaderBTN";
import {ModalCatEdit, ModalCatDelete, ModalProdEdit, ModalProdDelete} from "./modalCat-ProdEdit";

//todo вставить в стейты все модули
class StoreHeader extends Component {
    state = {
        user: null,
        data: 'No server connection.',
        token: false,
        admin: false,
        catEditModalOpen: false,
        catDeleteModalOpen: false,
        catEditName: '',
        prodEditModalOpen: false,
        prodDeleteModalOpen: false,
        prodEditName: '',
        prodEditCat: '',
        prodEditPrice: '',
    };

    componentDidMount() {
        this.callBackendAPI()
            .then(res => this.setState({data: res.express}))
            .catch(err => console.log(err));

        this.findUser()
            .then(res => this.setState({user: res.login, admin: res.isAdmin}))
            .catch(err => console.log(err));

    }

    callBackendAPI = async () => {
        let body;
        const response = await fetch('/express_backend');
        body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message);
        }
        return body;
    };

    findUser = async () => {
        if (localStorage.getItem('tokenReactStore') !== null) {
            this.setState({
                token:true
            });
        let data = localStorage.getItem('tokenReactStore');
        const response = await fetch('/user/getMyLogin', {
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
                    console.log(body.message);
                    break;
                case 200:
                    return body;
                default:
                    throw Error(body.message);
            }
        }
        else {
            this.setState({token:false});
        }
    };

    tokenDelete = ()=>{
        this.setState({token:false, user:null, admin:false});
    };

    catEditModalOpen = (catName)=>{
        this.setState({catEditName:catName});
        this.setState({catEditModalOpen:true})
    };

    catEditModalClose = ()=>{
        this.setState({catEditName:''});
        this.setState({catEditModalOpen:false})
    };

    catDeleteModalOpen = (catName)=>{
        this.setState({catEditName:catName});
        this.setState({catEditModalOpen:true})
    };

    render() {

        let forMainBTNS = null;
        if (this.state.user) {
            forMainBTNS = <UserHeaderBTN
                user={this.state.user}
                tokenDelete={this.tokenDelete}/>;
        }
        else {
            forMainBTNS = <RegAndAuthzBTN/>;
        }

        let forModals =null;
        if (this.state.admin) {
            forModals = <React.Fragment>

            </React.Fragment>;
        }
        else {
            forMainBTNS = <RegAndAuthzBTN/>;
        }

        return (
            <div className="App">
                        <React.Fragment>
                            <header className="Store-header">
                                <h1 className="App-title">Welcome to ReactStore</h1>
                                {forMainBTNS}
                            </header>
                            <p className="App-intro">{this.state.data}</p>
                            <Route
                                render={()=><MainColumns admin={this.state.admin}
                                                         catEditModalOpen={this.catEditModalOpen}/>}
                                exact path="/"/>
                            <Route path="/auth" component={AuthzWindow}/>
                            <Route path="/reg" component={RegWindow}/>
                            <Route path="/userEdit" component={EditWindow}/>
                            <ModalCatEdit catEditModalOpen={this.state.catEditModalOpen}
                                          catEditName={this.state.catEditName}
                                          catEditModalClose={this.catEditModalClose}
                                          token={this.state.token}/>
                        </React.Fragment>
            </div>
        )
    }
}

export {StoreHeader};