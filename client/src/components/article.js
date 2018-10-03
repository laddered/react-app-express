import React, {Component} from 'react';


class CategoryArticles extends Component {

    componentDidMount() {}
    render() {
        let data = this.props.data;
        let categoryTemplate;

        if (data.length > 0) {
            categoryTemplate = data.map(function (item, index) {
                return (
                    <div key={index}>
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
                    <div key={index}>
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
render() {
    let categoryName = this.props.data.categoryName;
    return(
        <div className="category-article">
            <p className ='category__name'> {categoryName} </p>
        </div>
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
            <div className='product-article'>
                <p className ='product__name'> {productName} </p>
                <p className ='product__name'> {productCategory} </p>
                <p className ='product__name'> {productSubcategory} </p>
                <p className ='product__name'> {productPrice} </p>
            </div>
        )
    }
}

export {CategoryArticles, ProductArticles};

