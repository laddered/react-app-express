import React, {Component} from 'react';


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
render() {
    let categoryName = this.props.data.categoryName;
    return(
        <React.Fragment>
            <p className ='category__name'> {categoryName} </p>
        </React.Fragment>
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
                <p className ='product__name'> {productName} </p>
                <p className ='product__name'> {productCategory} </p>
                <p className ='product__name'> {productSubcategory} </p>
                <p className ='product__name'> {productPrice} </p>
            </React.Fragment>
        )
    }
}

export {CategoryArticles, ProductArticles};

