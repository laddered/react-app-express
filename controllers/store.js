module.exports = function (app) {

    let Product = require('./../models/product');

    function createProduct(req, res){

    }

    function getProducts(req, res){

    }

    function editProduct(req, res){

    }

    function deleteProduct(req, res){

    }

    function createCategory(req, res){

    }

    function getCategories(req, res){

    }

    function editCategory(req, res){

    }

    function deleteCategory(req, res){

    }

    return {
        createProduct: createProduct,
        getProducts: getProducts,
        editProduct: editProduct,
        deleteProduct: deleteProduct,
        createCategory: createCategory,
        getCategories: getCategories,
        editCategory: editCategory,
        deleteCategory: deleteCategory
    }
};