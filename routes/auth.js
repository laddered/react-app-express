module.exports = function(app, jwt, configWT){
    let express = require('express');
    let authRouter = express.Router();
    let authCtrl = require('../controllers/auth')(app, jwt, configWT);

    authRouter.post('/createUser', authCtrl.createUser);
    authRouter.get('/signIn', authCtrl.signIn);

    return authRouter;
};