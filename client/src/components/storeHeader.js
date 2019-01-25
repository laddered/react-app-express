import React, {Component} from 'react';
import {Route} from "react-router-dom";
import {MainColumns} from "./column";
import {AuthzWindow} from "./authz";
import {RegWindow} from "./reg";
import {EditWindow} from "./userEdit";
import {RegAndAuthzBTN, UserHeaderBTN} from "./headerBTN";
import {ModalCatCreate, ModalCatEdit, ModalCatDelete, ModalProdCreate, ModalProdEdit, ModalProdDelete} from "./modalCat-ProdEdit";

class StoreHeader extends Component {
    state = {
        user: false,
        userName: null,
        data: 'No server connection.',
        token: false,
        admin: false,
        catCreateModalOpen: false,
        catEditModalOpen: false,
        catDeleteModalOpen: false,
        catEditName: '',
        prodCreateModalOpen: false,
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
            .then(res => this.setState({data:res.express}))
            .catch(err => console.log(err));

        this.getCategories();

        this.getProducts();

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
        else {
            switch (response.status) {
                case 500:
                    console.log(body.message);
                    break;
                case 200:
                    this.setState({
                        categories: body
                    });
                    break;
                default:
                    throw Error(body.message);
            }
        }
    };

    getProducts = async () => {
        const response = await fetch('/store/getProducts');
        const body = await response.json();
        if (response.status !== 200) {
            throw Error(body.message)
        }
        else {
            switch (response.status) {
                case 500:
                    console.log(body.message);
                    break;
                case 200:
                    this.setState({
                        products: body
                    });
                    break;
                default:
                    throw Error(body.message);
            }
        }
    };

    onBodyLoad = (body) => {
        this.setState({ products: body })
    };

    clickGetCategories = async () => {
        this.getProducts()
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

    catCreateModalOpen = ()=>{
        this.setState({catCreateModalOpen:true});
    };

    catCreateModalClose = ()=>{
        this.setState({catCreateModalOpen:false});
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

    prodCreateModalOpen = ()=>{
        this.setState({prodCreateModalOpen:true});
    };

    prodCreateModalClose = ()=>{
        this.setState({prodCreateModalOpen:false});
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
                <ModalCatCreate catCreateModalOpen={this.state.catCreateModalOpen}
                                catCreateModalClose={this.catCreateModalClose}
                                getCategories={this.getCategories}/>
                <ModalCatEdit catEditModalOpen={this.state.catEditModalOpen}
                              catEditModalClose={this.catEditModalClose}
                              catEditName={this.state.catEditName}
                              getCategories={this.getCategories}/>
                <ModalCatDelete catDeleteModalOpen={this.state.catDeleteModalOpen}
                                catDeleteModalClose={this.catDeleteModalClose}
                                catEditName={this.state.catEditName}
                                getCategories={this.getCategories}/>
                <ModalProdCreate prodCreateModalOpen={this.state.prodCreateModalOpen}
                                 prodCreateModalClose={this.prodCreateModalClose}
                                 getProducts={this.getProducts}/>
                <ModalProdEdit prodEditModalOpen={this.state.prodEditModalOpen}
                               prodEditModalClose={this.prodEditModalClose}
                               prodEditName={this.state.prodEditName}
                               prodEditCat={this.state.prodEditCat}
                               prodEditPrice={this.state.prodEditPrice}
                               getProducts={this.getProducts}/>
                <ModalProdDelete prodDeleteModalOpen={this.state.prodDeleteModalOpen}
                                 prodDeleteModalClose={this.prodDeleteModalClose}
                                 prodEditName={this.state.prodEditName}
                                 prodEditCat={this.state.prodEditCat}
                                 prodEditPrice={this.state.prodEditPrice}
                                 getProducts={this.getProducts}/>
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
                                                         catCreateModalOpen={this.catCreateModalOpen}
                                                         catEditModalOpen={this.catEditModalOpen}
                                                         catDeleteModalOpen={this.catDeleteModalOpen}
                                                         prodCreateModalOpen={this.prodCreateModalOpen}
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