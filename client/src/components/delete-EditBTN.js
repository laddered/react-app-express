import React, {Component} from 'react';
import ReactModal from 'react-modal';

class DeleteEditBTNCat extends Component {

    state = {
        editModalOpen:false,
        deleteModalOpen:false
    };

    openEditModal = ()=>{
        this.setState({editModalOpen:true})
    };
    openDeleteModal = ()=>{
        this.setState({deleteModalOpen:true})
    };

    deleteCat = () => {
        fetch("/store/deleteCategory", {
            method: "POST",
            dataType: "JSON",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        })
            .then((resp) => {
                return resp.json()
            })
            .then((data) => {
                console.log(data)
            })
            .catch((error) => {
                console.log(error, "Error")
            })
    };

    editCat = () => {
        fetch("/store/editCategory", {
            method: "POST",
            dataType: "JSON",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        })
            .then((resp) => {
                return resp.json()
            })
            .then((data) => {
                console.log(data)
            })
            .catch((error) => {
                console.log(error, "Error")
            })
    };

    render() {
        return (
            <React.Fragment>
                <button className='editCatBTN'
                        onClick={this.openEditModal}>
                    Edit
                </button>
                <ReactModal isOpen={this.state.editModalOpen}
                            className="regModalContent"
                            role="dialog"
                            overlayClassName="regModalOverlay"
                            ariaHideApp={false}
                            bodyOpenClassName="regModalBodyOpen">
                    <strong>Account has been registered!</strong>
                    <br/>
                    <button className='submit-btn'>Ok</button>
                </ReactModal>
                <button className='deleteCatBTN'
                        onClick={this.openDeleteModal}>
                    Delete
                </button>
                <ReactModal isOpen={this.state.deleteModalOpen}
                            className="regModalContent"
                            role="dialog"
                            overlayClassName="regModalOverlay"
                            ariaHideApp={false}
                            bodyOpenClassName="regModalBodyOpen">
                    <strong>Account has been registered!</strong>
                    <br/>
                    <button className='submit-btn'>Ok</button>
                </ReactModal>
            </React.Fragment>
        )
    }
}

class DeleteEditBTNProduct extends Component {

    state = {
        editModalOpen:false,
        deleteModalOpen:false
    };

    deleteCat = () => {
        fetch("/store/deleteCategory", {
            method: "POST",
            dataType: "JSON",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        })
            .then((resp) => {
                return resp.json()
            })
            .then((data) => {
                console.log(data)
            })
            .catch((error) => {
                console.log(error, "Error")
            })
    };

    editCat = () => {
        fetch("/store/editCategory", {
            method: "POST",
            dataType: "JSON",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        })
            .then((resp) => {
                return resp.json()
            })
            .then((data) => {
                console.log(data)
            })
            .catch((error) => {
                console.log(error, "Error")
            })
    };

    render() {
        return (
            <React.Fragment>
                <button className='editCatBTN'
                        onClick={this.editCat}>
                    Edit
                </button>
                <button className='deleteCatBTN'
                        onClick={this.deleteCat}>
                    Delete
                </button>
            </React.Fragment>
        )
    }
}

export {DeleteEditBTNCat, DeleteEditBTNProduct};