module.exports = function(app){
    let express = require('express');
    let storeRouter = express.Router();
    let storeCtrl = require('../controllers/store')(app);

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