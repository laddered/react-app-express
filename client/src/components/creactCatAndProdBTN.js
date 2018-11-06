import React, {Component} from 'react';


class CreateCategoryAndProductBTN extends Component {

    createCat = () => {
        fetch("/store/createCategory", {
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

    createProd = () => {
        fetch("/store/createProduct", {
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
            <button className='category-create-btn'
                    onClick={this.createCat}>
                Create category
            </button>
                <button className='product-create-btn'
                        onClick={this.createProd}>
                    Create product
                </button>
            </React.Fragment>
        )
    }
}

export {CreateCategoryAndProductBTN};

