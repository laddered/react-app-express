module.exports = function (app) {

    let bodyParser = require('body-parser'),
    Product = require('./../models/product'),
    Category = require('./../models/category'),
    User = require('./../models/user');

    function createProduct(req, res){

        let newProduct = Product({
                        productName: 'productName',
                        productCategory: 'productCategory',
                        productSubcategory: 'productSubcategory',
                        productPrice: '0'
                    });
        newProduct.save(function (err) {
                        if (err) return console.error(err);
                        console.log('Product created!');
                    });
                    res.send({mes:'Product created!'});
                }

    function getProducts(req, res){

        Product.find({}, function (err, product) {
            if (err) {console.error(err)}
            else {
                res.send(product);
                console.log('Products send!')
            }
        })
    }

    function getSpecificProducts(req, res){
        Product.find({productCategory: req.body.categoryName}, function (err, product) {
            if (err) {console.error(err)}
            else {
                res.send(product);
                console.log('Specific products send! ' + req.body.categoryName);
            }
        })
    }

    function editProduct(req, res){

    }

    function deleteProduct(req, res){

    }

    function createCategory(req, res){

        let newCategory = Category({
            categoryName: 'categoryName'
        });
        newCategory.save(function (err) {
            if (err) return console.error(err);
            console.log('Category created!');
        });
        res.send({data:'Category created!'});
    }

    function getCategories(req, res){

        Category.find({}, function (err, category) {
            if (err) {console.error(err)}
            else {
                res.send(category);
                console.log('Categories send!')
            }
        })
    }

    function editCategory(req, res){
        User.findById(req.decodedWT, (err, user)=>{
            if (user.isAdmin){

                Category.find({categoryName:req.body.oldCatName}, (err, category)=>{
                    if(category){res.status(409).send()}
                    else {

                    }
                })
            }
            else {
                res.status(501).send('User is not admin!')
            }
        });
    }

    function deleteCategory(req, res){}

    return {
        createProduct: createProduct,
        getProducts: getProducts,
        getSpecificProducts: getSpecificProducts,
        editProduct: editProduct,
        deleteProduct: deleteProduct,
        createCategory: createCategory,
        getCategories: getCategories,
        editCategory: editCategory,
        deleteCategory: deleteCategory
    }
};