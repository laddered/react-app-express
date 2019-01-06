module.exports = function(app){
    let express = require('express');
    let storeRouter = express.Router();
    let storeCtrl = require('../controllers/store')(app);
    let tokenCheck = require('../tokenCheck');

    storeRouter.post('/createProduct', storeCtrl.createProduct);
    storeRouter.get('/getProducts', storeCtrl.getProducts);
    storeRouter.post('/getSpecificProducts', storeCtrl.getSpecificProducts);
    storeRouter.post('/editProduct', storeCtrl.editProduct);
    storeRouter.delete('/deleteProduct', storeCtrl.deleteProduct);

    storeRouter.post('/createCategory', tokenCheck, storeCtrl.createCategory);
    storeRouter.get('/getCategories', storeCtrl.getCategories);
    storeRouter.post('/editCategory', tokenCheck, storeCtrl.editCategory);
    storeRouter.delete('/deleteCategory', tokenCheck, storeCtrl.deleteCategory);

    return storeRouter;
};