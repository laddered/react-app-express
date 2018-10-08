import React, {Component} from 'react';
import {CategoryArticles, ProductArticles} from './article';
import {CreateCategoryBTN, CreateProductBTN} from './button';
import {Link} from "react-router-dom";

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

    render() {
        let forCreateCatBTN = null,
            forCreateProdBTN = null;

        forCreateCatBTN = <CreateCategoryBTN/>;
        forCreateProdBTN = <CreateProductBTN/>;

        return (
            <div className="Main-columns">
                <div className="Category-column">
                    <Link onClick={this.getCategories} to=''><p>All category</p></Link>
                    <CategoryArticles data={this.state.categories}/>
                    <div className="admin-btns">
                        <div>{forCreateCatBTN}</div>
                        <div>{forCreateProdBTN}</div>
                    </div>
                </div>

                <div className="Product-column">
                    <ProductArticles data={this.state.products}/>
                </div>
            </div>
        );
    }
}

export {MainColumns};

