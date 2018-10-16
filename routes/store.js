module.exports = function(app){
    var express = require('express');
    var storeRouter = express.Router();
    var storeCtrl = require('../controllers/store')(app);

    storeRouter.post('/createProduct', storeCtrl.createProduct);
    storeRouter.get('/getProducts', storeCtrl.getProducts);
    storeRouter.post('/getSpecificProducts', storeCtrl.getSpecificProducts);
    storeRouter.post('/editProduct', storeCtrl.editProduct);
    storeRouter.delete('/deleteProduct', storeCtrl.deleteProduct);

    storeRouter.post('/createCategory', storeCtrl.createCategory);
    storeRouter.get('/getCategories', storeCtrl.getCategories);
    storeRouter.post('/editCategory', storeCtrl.editCategory);
    storeRouter.delete('/deleteCategory', storeCtrl.deleteCategory);

    return storeRouter;
};