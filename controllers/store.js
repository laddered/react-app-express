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
        User.findById(req.decodedWT.id, (err, user)=>{
            if (user.isAdmin){
                Product.find({productName:req.body.newProdName}, (err, product)=>{
                    if (product.length) {res.send({resCode:'3', message:'Already have a product with this name!'})}
                    else {
                        Product.findOneAndUpdate({productName:req.body.oldProdName}, {productName:req.body.newProdName}, {upsert:false}, function (err, doc){
                            if(req.body.newProdCat !== ''){
                                Product.findOneAndUpdate({productName:req.body.newProdName}, {productCategory:req.body.newProdCat}, {upsert:false}, function (err, doc){})
                            }
                            if(req.body.newProdPrice !== ''){
                                Product.findOneAndUpdate({productName:req.body.newProdName}, {productPrice:req.body.newProdPrice}, {upsert:false}, function (err, doc){})
                            }
                            res.send({resCode:'2', message:'The product has been successfully modified!'})
                        });
                    }
                })
            }
            else {
                res.send({resCode:'4', message:'User is not admin!'})
            }
        });
    }

    function deleteProduct(req, res){
        User.findById(req.decodedWT.id, (err, user)=>{
            if (user.isAdmin){
                Product.findOneAndDelete({productName:req.body.prodName}, {}, function (err, doc) {
                    res.send({resCode:'2', message:'Product was successfully removed!'})
                })
            }
            else {
                res.send({resCode:'4', message:'User is not admin!'})
            }
        })
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
        User.findById(req.decodedWT.id, (err, user)=>{
            if (user.isAdmin){
                Category.find({categoryName:req.body.newCatName}, (err, category)=>{
                    if (category.length) {res.send({resCode:'3', message:'Already have a category with this name!'})}
                    else {
                        console.log(req.body);
                        Category.findOneAndUpdate({categoryName:req.body.oldCatName}, {categoryName:req.body.newCatName}, {upsert:false}, function (err, doc){
                            res.send({resCode:'2', message:'The product has been successfully modified!'})
                        });
                    }
                })
            }
            else {
                res.send({resCode:'4', message:'User is not admin!'})
            }
        });
    }

    function deleteCategory(req, res){
        User.findById(req.decodedWT.id, (err, user)=>{
            console.log('ВОООООООООт здесь');
            if (user.isAdmin){
                Category.findOneAndRemove({categoryName:req.body.catName}, function (err, doc){
                    res.send({data:'YEEEES!'})
                })
            }
            else {
                res.status(501).send('User is not admin!')
            }
        });
    }

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