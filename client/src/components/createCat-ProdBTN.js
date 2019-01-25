import React, {Component} from 'react';


class CreateCategoryAndProductBTN extends Component {

    render() {
        return (
            <React.Fragment>
            <button className='category-create-btn'
                    onClick={this.props.catCreateModalOpen}>
                Create category
            </button>
                <button className='product-create-btn'
                        onClick={this.props.prodCreateModalOpen}>
                    Create product
                </button>
            </React.Fragment>
        )
    }
}

export {CreateCategoryAndProductBTN};