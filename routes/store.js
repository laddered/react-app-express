module.exports = function(app){
    let express = require('express');
    let storeRouter = express.Router();
    let storeCtrl = require('../controllers/store')(app);
    let tokenCheck = require('../tokenCheck');

    storeRouter.post('/createProduct', tokenCheck, storeCtrl.createProduct);
    storeRouter.get('/getProducts', storeCtrl.getProducts);
    storeRouter.post('/getSpecificProducts', storeCtrl.getSpecificProducts);
    storeRouter.post('/editProduct', tokenCheck, storeCtrl.editProduct);
    storeRouter.post('/deleteProduct', tokenCheck, storeCtrl.deleteProduct);

    storeRouter.post('/createCategory', tokenCheck, storeCtrl.createCategory);
    storeRouter.get('/getCategories', storeCtrl.getCategories);
    storeRouter.post('/editCategory', tokenCheck, storeCtrl.editCategory);
    storeRouter.post('/deleteCategory', tokenCheck, storeCtrl.deleteCategory);

    return storeRouter;
};