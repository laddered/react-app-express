import React, {Component} from 'react';
import ReactModal from "react-modal";

class ModalCatCreate extends Component {
    state = {
        newCatName:'',
        newCatNameValid:false,
        catNameMatchFound:false
    };

    catNameChange = (e)=>{
        let regExp = /[A-Za-zа-яА-ЯёЁ0-9-_@]/;
        this.setState({
            newCatName: e.target.value,
            catNameMatchFound: false,
            newCatNameValid: regExp.test(e.target.value)
        });
    };

    onCreate = async () => {
        const response = await fetch('/store/createCategory', {
            method: "POST",
            dataType: "JSON",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({
                newCatName:this.state.newCatName,
                token:localStorage.getItem('tokenReactStore')
            })
        });
        const body = await response.json();

        switch (body.resCode) {
            case '4':
                console.log(body.message);
                break;
            case '3':
                this.setState({catNameMatchFound:true});
                break;
            case '2':
                console.log(body.message);
                this.props.getCategories();
                this.props.catCreateModalClose();
                break;
            default:
                console.log(body)
        }
    };

    onCancel = ()=>{
        this.props.catCreateModalClose();
        this.setState({catNameMatchFound:false})
    };

    render(){
        return(
            <ReactModal isOpen={this.props.catCreateModalOpen}
                        className="regModalContent"
                        role="dialog"
                        overlayClassName="regModalOverlay"
                        ariaHideApp={false}
                        bodyOpenClassName="regModalBodyOpen">
                <h1><strong>Category creation:</strong></h1>
                <input className='input-reg' placeholder={'Enter the name of the new category'}
                       onChange={e => this.catNameChange(e)}
                       maxLength={40}/>
                <div className={this.state.catNameMatchFound ? 'input-error-warning' : 'input-error-none' }>Already have a category with this name!</div>
                <br/><br/>
                <button className='submit-btn-inline' onClick={this.onCreate} disabled={!(this.state.newCatNameValid)}>Create</button>
                <button className='submit-btn-inline' onClick={this.onCancel}>Cancel</button>
            </ReactModal>
        );
    };
}


class ModalCatEdit extends Component {

    state = {
        newCatName:'',
        newCatNameValid:false,
        catNameMatchFound:false
    };

    catNameChange = (e)=>{
        let regExp = /[A-Za-zа-яА-ЯёЁ0-9-_@]/;
        this.setState({
            newCatName: e.target.value,
            catNameMatchFound: false,
            newCatNameValid: regExp.test(e.target.value)
        });
    };

    onSave = async () => {
        const response = await fetch('/store/editCategory', {
            method: "POST",
            dataType: "JSON",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({
                newCatName:this.state.newCatName,
                oldCatName:this.props.catEditName,
                token:localStorage.getItem('tokenReactStore')
            })
        });
        const body = await response.json();

        switch (body.resCode) {
            case '4':
                console.log(body.message);
                break;
            case '3':
                this.setState({catNameMatchFound:true});
                break;
            case '2':
                console.log(body.message);
                this.props.getCategories();
                this.props.catEditModalClose();
                break;
            default:
                console.log(body)
        }
    };

    onCancel = ()=>{
        this.props.catEditModalClose();
        this.setState({catNameMatchFound:false})
    };

    render(){
        return(
            <ReactModal isOpen={this.props.catEditModalOpen}
                        className="regModalContent"
                        role="dialog"
                        overlayClassName="regModalOverlay"
                        ariaHideApp={false}
                        bodyOpenClassName="regModalBodyOpen">
                <h1><strong>Category editing:</strong></h1>
                <input className='input-reg' placeholder={this.props.catEditName}
                onChange={e => this.catNameChange(e)}
                maxLength={40}/>
                <div className={this.state.catNameMatchFound ? 'input-error-warning' : 'input-error-none' }>Already have a category with this name!</div>
                <br/><br/>
                <button className='submit-btn-inline' onClick={this.onSave} disabled={!(this.state.newCatNameValid)}>Save</button>
                <button className='submit-btn-inline' onClick={this.onCancel}>Cancel</button>
                <br/><br/>
                <div>*If you do not want to change the value of the field, leave it blank.</div>
            </ReactModal>
        );
    };
}

class ModalCatDelete extends Component {

    onDelete = async () => {
        const response = await fetch('/store/deleteCategory', {
            method: "POST",
            dataType: "JSON",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({
                catName:this.props.catEditName,
                token:localStorage.getItem('tokenReactStore')
            })
        });
        const body = await response.json();

        switch (response.status) {
            case 500:
                this.setState({tokenValid:false});
                break;
            case 501:
                this.setState({tokenValid:false});
                console.log(response.body);
                break;
            case 409:
                this.setState({catNameMatchFound:true});
                break;
            case 200:
                console.log(body.message);
                this.props.getCategories();
                this.props.catDeleteModalClose();
                break;
            default:
                console.log(body)
        }
    };

    render(){
        return(
            <ReactModal isOpen={this.props.catDeleteModalOpen}
                        className="regModalContent"
                        role="dialog"
                        overlayClassName="regModalOverlay"
                        ariaHideApp={false}
                        bodyOpenClassName="regModalBodyOpen">
                <h1>Category deleting:</h1>
                <div>{this.props.catEditName}</div>
                <br/>
                <button className='submit-btn-inline' onClick={this.onDelete}>Delete</button>
                <button className='submit-btn-inline' onClick={this.props.catDeleteModalClose}>Cancel</button>
            </ReactModal>
        );
    };
}

class ModalProdCreate extends Component {

    state = {
        newProdName:'',
        newProdNameValid:'',
        prodNameMatchFound:false,
        newProdCat:'',
        newProdCatValid:'',
        newProdPrice:'',
        newProdPriceValid:''
    };

    prodNameChange = (e)=>{
        let regExp = /[A-Za-zа-яА-ЯёЁ0-9-_@]/;
        this.setState({
            newProdName: e.target.value,
            prodNameMatchFound: false,
            newProdNameValid: regExp.test(e.target.value)
        });
    };

    prodCatChange = (e)=>{
        let regExp = /[A-Za-zа-яА-ЯёЁ0-9-_@]/;
        this.setState({
            newProdCat: e.target.value,
            newProdCatValid:regExp.test(e.target.value)
        });
    };

    prodPriceChange = (e)=>{
        let regExp = /[A-Za-zа-яА-ЯёЁ0-9-_@]/;
        this.setState({
            newProdPrice: e.target.value,
            newProdPriceValid:regExp.test(e.target.value)
        });
    };

    onCreate = async () => {
        const response = await fetch('/store/createProduct', {
            method: "POST",
            dataType: "JSON",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({
                newProdName:this.state.newProdName,
                newProdCat:this.state.newProdCat,
                newProdPrice:this.state.newProdPrice,
                token:localStorage.getItem('tokenReactStore')
            })
        });
        const body = await response.json();

        switch (body.resCode) {
            case '5':
                console.log('Invalid or expired token!');
                break;
            case '4':
                console.log('User is not admin!');
                break;
            case '3':
                console.log(body.message);
                this.setState({prodNameMatchFound:true});
                break;
            case '2':
                console.log(body.message);
                this.props.getProducts();
                this.props.prodCreateModalClose();
                break;
            default:
                console.log(body)
        }
    };

    onCancel = ()=>{
        this.props.prodCreateModalClose();
        this.setState({prodNameMatchFound: false})
    };

    render(){
        return(
            <ReactModal isOpen={this.props.prodCreateModalOpen}
                        className="regModalContent"
                        role="dialog"
                        overlayClassName="regModalOverlay"
                        ariaHideApp={false}
                        bodyOpenClassName="regModalBodyOpen">
                <h1>Product creation:</h1>
                <input className='input-reg' placeholder={'Enter the name of the new product'}
                       onChange={e => this.prodNameChange(e)}
                       maxLength={40}/>
                <div className={this.state.prodNameMatchFound ? 'input-error-warning' : 'input-error-none' }>Already have a product with this name!</div>
                <input className='input-reg' placeholder={'Enter the category of the new product'}
                       onChange={e => this.prodCatChange(e)}
                       maxLength={40}/>
                <input className='input-reg' placeholder={'Enter the price of the new product'}
                       onChange={e => this.prodPriceChange(e)}
                       maxLength={40}/>
                <br/><br/>
                <button className='submit-btn-inline' onClick={this.onCreate}
                        disabled={!(this.state.newProdNameValid && this.state.newProdCatValid && this.state.newProdPriceValid)}>Create</button>
                <button className='submit-btn-inline' onClick={this.onCancel}>Cancel</button>
            </ReactModal>
        );
    };
}

class ModalProdEdit extends Component {

    state = {
        newProdName:'',
        prodNameMatchFound:false,
        newProdCat:'',
        newProdPrice:''
    };

    prodNameChange = (e)=>{
        this.setState({
            newProdName: e.target.value,
            prodNameMatchFound: false
        });
    };

    prodCatChange = (e)=>{
        this.setState({
            newProdCat: e.target.value,
        });
    };

    prodPriceChange = (e)=>{
        this.setState({
            newProdPrice: e.target.value,
        });
    };

    onSave = async () => {
        const response = await fetch('/store/editProduct', {
            method: "POST",
            dataType: "JSON",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({
                newProdName:this.state.newProdName,
                oldProdName:this.props.prodEditName,
                newProdCat:this.state.newProdCat,
                newProdPrice:this.state.newProdPrice,
                token:localStorage.getItem('tokenReactStore')
            })
        });
        const body = await response.json();

        switch (body.resCode) {
            case '5':
                console.log('Invalid or expired token!');
                break;
            case '4':
                console.log('User is not admin!');
                break;
            case '3':
                console.log(body.message);
                this.setState({prodNameMatchFound:true});
                break;
            case '2':
                console.log(body.message);
                this.props.getProducts();
                this.props.prodEditModalClose();
                break;
            default:
                console.log(body)
        }
    };

    onCancel = ()=>{
        this.props.prodEditModalClose();
        this.setState({prodNameMatchFound: false})
    };

    render(){
        return(
            <ReactModal isOpen={this.props.prodEditModalOpen}
                        className="regModalContent"
                        role="dialog"
                        overlayClassName="regModalOverlay"
                        ariaHideApp={false}
                        bodyOpenClassName="regModalBodyOpen">
                <h1>Product editing:</h1>
                <input className='input-reg' placeholder={this.props.prodEditName}
                       onChange={e => this.prodNameChange(e)}
                       maxLength={40}/>
                <div className={this.state.prodNameMatchFound ? 'input-error-warning' : 'input-error-none' }>Already have a product with this name!</div>
                <input className='input-reg' placeholder={this.props.prodEditCat}
                       onChange={e => this.prodCatChange(e)}
                       maxLength={40}/>
                <input className='input-reg' placeholder={this.props.prodEditPrice + ' $'}
                       onChange={e => this.prodPriceChange(e)}
                       maxLength={40}/>
                <br/><br/>
                <button className='submit-btn-inline' onClick={this.onSave}>Save</button>
                <button className='submit-btn-inline' onClick={this.onCancel}>Cancel</button>
                <br/><br/>
                <div>*If you do not want to change the value of the field, leave it blank.</div>
            </ReactModal>
        );
    };
}

class ModalProdDelete extends Component {

    onDelete = async () => {
        const response = await fetch('/store/deleteProduct', {
            method: "POST",
            dataType: "JSON",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({
                prodName:this.props.prodEditName,
                token:localStorage.getItem('tokenReactStore')
            })
        });
        const body = await response.json();

        switch (body.resCode) {
            case '4':
                console.log(body.message);
                break;
            case '2':
                console.log(body.message);
                this.props.getProducts();
                this.props.prodDeleteModalClose();
                break;
            default:
                console.log(body)
        }
    };

    render(){
        return(
            <ReactModal isOpen={this.props.prodDeleteModalOpen}
                        className="regModalContent"
                        role="dialog"
                        overlayClassName="regModalOverlay"
                        ariaHideApp={false}
                        bodyOpenClassName="regModalBodyOpen">
                <h1>Product deleting:</h1>
                <div>{this.props.prodEditName}</div><br/>
                <div>{this.props.prodEditCat}</div><br/>
                <div>{this.props.prodEditPrice} $</div>
                <br/>
                <button className='submit-btn-inline' onClick={this.onDelete}>Delete</button>
                <button className='submit-btn-inline' onClick={this.props.prodDeleteModalClose}>Cancel</button>
            </ReactModal>
        );
    };
}

export {ModalCatCreate, ModalCatEdit, ModalCatDelete, ModalProdCreate, ModalProdEdit, ModalProdDelete};