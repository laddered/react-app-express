import React, {Component} from 'react';
import ReactModal from "react-modal";

class ModalCatEdit extends Component {

    state = {
        newCatName:'',
        newCatNameValid:false,
        catNameMatchFound:false,
        tokenValid:true
    };

    catNameChange = (e)=>{
        let regExp = /^[A-Za-z]+[A-Za-z0-9]+$/;
        this.setState({
            newCatName: e.target.value,
            newCatNameValid: regExp.test(e.target.value),
            catNameMatchFound: false
        });
    };

    onSubmit = async () => {
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
        console.log(body);

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
                console.log('Its work!!!!!!!!');
                break;
            default:
                console.log(body)
        }
    };

    render(){
        return(
            <ReactModal isOpen={this.props.catEditModalOpen}
                        className="regModalContent"
                        role="dialog"
                        overlayClassName="regModalOverlay"
                        ariaHideApp={false}
                        bodyOpenClassName="regModalBodyOpen">
                <h1><strong>Category editing</strong></h1>
                <input className='input-reg' placeholder={this.props.catEditName}
                onChange={e => this.catNameChange(e)}
                maxLength={40}/>
                <br/><br/>
                <button className='submit-btn-inline' onClick={this.onSubmit}>Submit</button>
                <button className='submit-btn-inline' onClick={this.props.catEditModalClose}>Cancel</button>
            </ReactModal>
        );
    };
}

class ModalCatDelete extends Component {

    render(){
        return(
            <ReactModal isOpen={this.props.catEditModalOpen}
                        className="regModalContent"
                        role="dialog"
                        overlayClassName="regModalOverlay"
                        ariaHideApp={false}
                        bodyOpenClassName="regModalBodyOpen">
                <strong>Category deleting</strong>
                <br/>
                <input className='input-reg' placeholder={'Enter new category name'}/>
                <br/>
                <button className='submit-btn'>Submit</button>
            </ReactModal>
        );
    };
}

class ModalProdEdit extends Component {

    render(){
        return(
            <ReactModal isOpen={this.props.catEditModalOpen}
                        className="regModalContent"
                        role="dialog"
                        overlayClassName="regModalOverlay"
                        ariaHideApp={false}
                        bodyOpenClassName="regModalBodyOpen">
                <strong>Product editing</strong>
                <br/>
                <input className='input-reg' placeholder={'Enter new category name'}/>
                <br/>
                <button className='submit-btn'>Submit</button>
            </ReactModal>
        );
    };
}

class ModalProdDelete extends Component {

    render(){
        return(
            <ReactModal isOpen={this.props.catEditModalOpen}
                        className="regModalContent"
                        role="dialog"
                        overlayClassName="regModalOverlay"
                        ariaHideApp={false}
                        bodyOpenClassName="regModalBodyOpen">
                <strong>Product deleting</strong>
                <br/>
                <input className='input-reg' placeholder={'Enter new category name'}/>
                <br/>
                <button className='submit-btn'>Submit</button>
            </ReactModal>
        );
    };
}

export {ModalCatEdit, ModalCatDelete, ModalProdEdit, ModalProdDelete};