import React, {Component} from 'react';
import {Route} from "react-router-dom";
import {MainColumns} from "./column";
import {AuthzWindow} from "./authz";
import {RegWindow} from "./reg";
import {EditWindow} from "./userEdit";
import {RegAndAuthzBTN} from "./reg-authzHeaderBTN";
import {UserHeaderBTN} from "./userHeaderBTN";
import {ModalCatEdit, ModalCatDelete, ModalProdEdit, ModalProdDelete} from "./modalCat-ProdEdit";

class StoreHeader extends Component {
    state = {
        user: false,
        userName: null,
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
        categories: [],
        subcategories: [],
        products: []
    };

    componentDidMount() {
        this.callBackendAPI()
            .then(res => this.setState({data: res.express}))
            .catch(err => console.log(err));

        this.getCategories()
            .then(res => this.setState({ categories: res }))
            .catch(err => console.log(err));

        this.getProducts()
            .then(res => this.setState({ products: res }))
            .catch(err => console.log(err));

        this.findUser()
            .then(res => this.setState({userName: res.login, user:true, admin: res.isAdmin}))
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

    getCategories = async () => {
        const response = await fetch('/store/getCategories');
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body;
    };

    getProducts = async () => {
        const response = await fetch('/store/getProducts');
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body;
    };

    onBodyLoad = (body) => {
        this.setState({ products: body })
    };

    clickGetCategories = async () => {
        this.getProducts()
            .then(res => this.setState({ products: res }))
            .catch(err => console.log(err));
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
        this.setState({token:false, userName:null, user:false, admin:false});
    };

    catEditModalOpen = (catName)=>{
        this.setState({catEditName:catName, catEditModalOpen:true});
    };

    catEditModalClose = ()=>{
        this.setState({catEditName:'', catEditModalOpen:false});
    };

    catDeleteModalOpen = (catName)=>{
        this.setState({catEditName:catName, catDeleteModalOpen:true});
    };

    catDeleteModalClose = ()=>{
        this.setState({catEditName:'', catDeleteModalOpen:false});
    };

    prodEditModalOpen = (prodName, prodCat, prodPrice)=>{
        this.setState({prodEditName:prodName, prodEditCat:prodCat ,prodEditPrice:prodPrice ,prodEditModalOpen:true});
    };

    prodEditModalClose = ()=>{
        this.setState({catEditName:'', prodEditModalOpen:false});
    };

    prodDeleteModalOpen = (prodName, prodCat, prodPrice)=>{
        this.setState({prodEditName:prodName, prodEditCat:prodCat ,prodEditPrice:prodPrice ,prodDeleteModalOpen:true});
    };

    prodDeleteModalClose = ()=>{
        this.setState({catEditName:'', prodDeleteModalOpen:false});
    };

    render() {
        let forMainBTNS = null;
        if (this.state.user) {
            forMainBTNS = <UserHeaderBTN
                user={this.state.userName}
                tokenDelete={this.tokenDelete}/>;
        }
        else {
            forMainBTNS = <RegAndAuthzBTN/>;
        }


        let forModals = null;
        if (this.state.admin) {
            forModals = <React.Fragment>
                <ModalCatEdit catEditModalOpen={this.state.catEditModalOpen}
                              catEditModalClose={this.catEditModalClose}
                              catEditName={this.state.catEditName}/>
                <ModalCatDelete catDeleteModalOpen={this.state.catDeleteModalOpen}
                                catDeleteModalClose={this.catDeleteModalClose}
                                catEditName={this.state.catEditName}/>
                <ModalProdEdit prodEditModalOpen={this.state.prodEditModalOpen}
                               prodEditModalClose={this.prodEditModalClose}
                               prodEditName={this.state.prodEditName}
                               prodEditCat={this.state.prodEditCat}
                               prodEditPrice={this.state.prodEditPrice}/>
                <ModalProdDelete prodDeleteModalOpen={this.state.prodDeleteModalOpen}
                                 prodDeleteModalClose={this.prodDeleteModalClose}
                                 prodEditName={this.state.prodEditName}
                                 prodEditCat={this.state.prodEditCat}
                                 prodEditPrice={this.state.prodEditPrice}/>
            </React.Fragment>;
        }
        else {
            forModals = null;
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
                                                         catEditModalOpen={this.catEditModalOpen}
                                                         catDeleteModalOpen={this.catDeleteModalOpen}
                                                         prodEditModalOpen={this.prodEditModalOpen}
                                                         prodDeleteModalOpen={this.prodDeleteModalOpen}
                                                         onBodyLoad={this.onBodyLoad}
                                                         clickGetCategories={this.clickGetCategories}
                                                         categories={this.state.categories}
                                                         subcategories={this.state.subcategories}
                                                         products={this.state.products}/>}
                                exact path="/"/>
                            <Route path="/auth" component={AuthzWindow}/>
                            <Route path="/reg" component={RegWindow}/>
                            <Route path="/userEdit" component={EditWindow}/>
                            {forModals}
                        </React.Fragment>
            </div>
        )
    }
}

export {StoreHeader};