import React, {Component} from 'react';

class DeleteEditBTNCat extends Component {

    openEditModal = ()=>{
        this.props.catEditModalOpen(this.props.categoryName)
    };

    openDeleteModal = ()=>{
        this.props.catDeleteModalOpen(this.props.categoryName)
    };

    render() {
        return (
                    <React.Fragment>
                        <button className='editCatBTN'
                                onClick={this.openEditModal}>
                            Edit
                        </button>
                        <button className='deleteCatBTN'
                                onClick={this.openDeleteModal}>
                            Delete
                        </button>
                    </React.Fragment>
        )}
}

class DeleteEditBTNProduct extends Component {

    openEditModal = ()=>{
        this.props.prodEditModalOpen(this.props.prodName, this.props.prodCat, this.props.prodPrice)
    };

    openDeleteModal = ()=>{
        this.props.prodDeleteModalOpen(this.props.prodName, this.props.prodCat, this.props.prodPrice)
    };

    render() {
        return (
            <React.Fragment>
                <button className='editCatBTN'
                        onClick={this.openEditModal}>
                    Edit
                </button>
                <button className='deleteCatBTN'
                        onClick={this.openDeleteModal}>
                    Delete
                </button>
            </React.Fragment>
        )}
}

export {DeleteEditBTNCat, DeleteEditBTNProduct};