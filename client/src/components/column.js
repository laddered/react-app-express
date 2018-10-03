import React, {Component} from 'react';
import {CategoryArticles, ProductArticles} from './article';

class MainColumns extends Component {

    state = {
        categories:
            [{categoryName: 'Computers and peripherals'},
            {categoryName: 'Smartphones and smart watches'},
            {categoryName: 'TV and media'},
            {categoryName: 'Audio equipment'},
            {categoryName: 'Games and consoles'}],
        subcategories: [{
            subcategoryName: 'Smartphones',
            categoryName: 'Smartphones and smart watches'
        },{
            subcategoryName: 'TV',
            categoryName: 'TV and media'
        },{
            subcategoryName: 'Speakers',
            categoryName: 'Audio equipment'
        },{
            subcategoryName: 'PC',
            categoryName: 'Computers and peripherals'
        },{
            subcategoryName: 'Consoles',
            categoryName: 'Games and consoles'
        }],
        products:
            [{
                productName: 'Samsung Galaxy S',
                productCategory: 'Smartphones and smart watches',
                productSubcategory: 'Smartphones',
                productPrice: '705'
        },{
                productName: 'TV Led LG',
                productCategory: 'TV and media',
                productSubcategory: 'TV',
                productPrice: '1300'
        },{
                productName: 'Panasonic',
                productCategory: 'TV and media',
                productSubcategory: 'TV',
                productPrice: '1300'
            },{
                productName: 'Sony',
                productCategory: 'TV and media',
                productSubcategory: 'TV',
                productPrice: '1300'
            },{
                productName: 'Speakers SVEN',
                productCategory: 'Audio equipment',
                productSubcategory: 'Speakers',
                productPrice: '210'
        },{
                productName: 'PC Tiger 370',
                productCategory: 'Computers and peripherals',
                productSubcategory: 'PC',
                productPrice: '890'
        },{
                productName: 'PS-4 pro',
                productCategory: 'Games and consoles',
                productSubcategory: 'Consoles',
                productPrice: '400'
        }]
    };

    componentDidMount() {

        /*
        this.getCategories()
            .then(res => this.setState({ categories: res.express }))
            .catch(err => console.log(err));

        this.getProducts()
            .then(res => this.setState({ products: res.express }))
            .catch(err => console.log(err));
            */
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

    render() {
        return (
            <div className="Main-columns">
                <div className="Category-column">
                    <p>Category </p>
                    <CategoryArticles data={this.state.categories}/>
                </div>
                <div className="Product-column">
                    <p>Product </p>
                    <ProductArticles data={this.state.products}/>
                </div>
            </div>
        );
    }
}

export {MainColumns};

