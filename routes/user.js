module.exports = function(app){
    let express = require('express');
    let userRouter = express.Router();
    let userCtrl = require('../controllers/user')(app);
    let tokenCheck = require('../tokenCheck');

    userRouter.get('/getMe', userCtrl.getMe);
    userRouter.post('/getMyLogin', tokenCheck, userCtrl.getMyLogin);
    userRouter.post('/editMe', userCtrl.editMe);
    userRouter.delete('/deleteMe', userCtrl.deleteMe);

    return userRouter;
};