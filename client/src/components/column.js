import React, {Component} from 'react';
import {CategoryContainer, ProductContainer} from './article';
import {CreateCategoryAndProductBTN} from './createCat-ProdBTN';
import {Link} from "react-router-dom";

class MainColumns extends Component {
    state = {
        categories: [],
        subcategories: [],
        products: []
    };

    onBodyLoad = (body) => {
        this.setState({ products: body })
    };

    componentDidMount() {


        this.getCategories()
            .then(res => this.setState({ categories: res }))
            .catch(err => console.log(err));

        this.getProducts()
            .then(res => this.setState({ products: res }))
            .catch(err => console.log(err));
    }



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

    clickGetCategories = async () => {
        this.getProducts()
            .then(res => this.setState({ products: res }))
            .catch(err => console.log(err));
    };

    render() {
        let forCreateCatAndProdBTN = null;
        if (this.props.admin === false) {
            forCreateCatAndProdBTN = <CreateCategoryAndProductBTN/>;
        }
        return (
            <div className="Main-columns">
                <div className="Category-column">
                    <Link onClick={this.clickGetCategories} to='' className='all-cat-link'><p>All category</p></Link>
                    <CategoryContainer
                        onBodyLoad={this.onBodyLoad}
                        data={this.state.categories}
                        admin={this.props.admin}
                    />
                    <div className="admin-btns">
                        <div>{forCreateCatAndProdBTN}</div>
                    </div>
                </div>

                <div className="Product-column">
                    <ProductContainer
                        data={this.state.products}
                        admin={this.props.admin}
                    />
                </div>
            </div>
        );
    }
}

export {MainColumns};

