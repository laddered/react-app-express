import React, {Component} from 'react';
import {CategoryContainer, ProductContainer} from './article';
import {CreateCategoryAndProductBTN} from './createCat-ProdBTN';
import {Link} from "react-router-dom";

class MainColumns extends Component {

    render() {
        let forCreateCatAndProdBTN = null;
        if (this.props.admin === true) {
            forCreateCatAndProdBTN = <CreateCategoryAndProductBTN catCreateModalOpen={this.props.catCreateModalOpen}
                                                                  prodCreateModalOpen={this.props.prodCreateModalOpen}/>;
        }

        return (
            <div className="Main-columns">
                <div className="Category-column">
                    <Link onClick={this.props.clickGetCategories} to='' className='all-cat-link'><p>All category</p></Link>
                    <CategoryContainer
                        onBodyLoad={this.props.onBodyLoad}
                        data={this.props.categories}
                        admin={this.props.admin}
                        catEditModalOpen={this.props.catEditModalOpen}
                        catDeleteModalOpen={this.props.catDeleteModalOpen}
                    />
                    <div className="admin-btns">
                        <div>{forCreateCatAndProdBTN}</div>
                    </div>
                </div>

                <div className="Product-column">
                    <ProductContainer
                        data={this.props.products}
                        admin={this.props.admin}
                        prodEditModalOpen={this.props.prodEditModalOpen}
                        prodDeleteModalOpen={this.props.prodDeleteModalOpen}
                    />
                </div>
            </div>
        );
    }
}

export {MainColumns};

