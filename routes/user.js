module.exports = function(app){
    let express = require('express');
    let userRouter = express.Router();
    let userCtrl = require('../controllers/user')(app);
    let tokenCheck = require('../tokenCheck');

    userRouter.post('/getMe', tokenCheck, userCtrl.getMe);
    userRouter.post('/getMyLogin', tokenCheck, userCtrl.getMyLogin);
    userRouter.post('/editMe', tokenCheck, userCtrl.editMe);
    userRouter.post('/editMyPassword', userCtrl.editMyPassword);
    userRouter.delete('/deleteMe', userCtrl.deleteMe);

    return userRouter;
};