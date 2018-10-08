import React, {Component} from 'react';
import {Link} from "react-router-dom";

class CategoryArticles extends Component {

    componentDidMount() {}
    render() {
        let data = this.props.data;
        let categoryTemplate;

        if (data.length > 0) {
            categoryTemplate = data.map(function (item, index) {
                return (
                    <div className="category-article" key={index}>
                        <CategoryArticle data={item}/>
                    </div>
                )
            })
        }
        else {categoryTemplate = <p>No categories!</p>}

        return (
            <React.Fragment>
                {categoryTemplate}
            </React.Fragment>
        )
    }
}

class ProductArticles extends Component {

    componentDidMount() {}
    render() {
        var data = this.props.data;
        var productTemplate;

        if (data.length > 0) {
            productTemplate = data.map(function (item, index) {
                return(
                    <div className='product-article' key={index}>
                        <ProductArticle data={item}/>
                    </div>
                )
            })
        }
        else {productTemplate = <p>No product!</p>}

        return (
            <React.Fragment>
                {productTemplate}
            </React.Fragment>
        );
    }
}

class CategoryArticle extends Component {
    getSpecificProduct = async () => {

        let params = {categoryName: this.props.data.categoryName},
        url = new URL('/store/getSpecificProducts');
        url.search = new URLSearchParams(params);

        const response = await fetch(url, {
            method: "GET",
            dataType: "JSON",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        });
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body;
    };

render() {
    let categoryName = this.props.data.categoryName;
    return(
            <Link className ='category__name' to=''
                  onClick={this.getSpecificProduct}>
                {categoryName}</Link>
    )
    }
}

class ProductArticle extends Component {
    render(){
            let productName = this.props.data.productName,
            productCategory = this.props.data.productCategory,
            productSubcategory = this.props.data.productSubcategory,
            productPrice = this.props.data.productPrice;
        return (
            <React.Fragment>
                <p className ='product__name'>{productName}</p>
                <p className ='product__category'>{productCategory}</p>
                <p className ='product__subcategory'>{productSubcategory}</p>
                <p className ='product__price'>{productPrice}$</p>
            </React.Fragment>
        )
    }
}

export {CategoryArticles, ProductArticles};

