import React, {Component} from 'react';
import {AppContext} from "./appProvider";

class DeleteEditBTNCat extends Component {


    openEditModal = ()=>{
        this.props.catEditModalOpen(this.props.categoryName)
    };

    openDeleteModal = ()=>{
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
    };

    openDeleteModal = ()=>{
    };

    render() {
        return (
            <AppContext.Consumer>
                {(context) =>(

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
            </AppContext.Consumer>
        )}
}

export {DeleteEditBTNCat, DeleteEditBTNProduct};