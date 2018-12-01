module.exports = function(app, jwt, configWT){
    let express = require('express');
    let authzRouter = express.Router();
    let authzCtrl = require('../controllers/authz')(app, jwt, configWT);

    authzRouter.post('/createUser', authzCtrl.createUser);
    authzRouter.post('/signIn', authzCtrl.signIn);

    return authzRouter;
};