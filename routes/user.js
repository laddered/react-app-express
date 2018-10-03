module.exports = function(app){
    var express = require('express');
    var userRouter = express.Router();
    var userCtrl = require('../controllers/user')(app);

    userRouter.get('/getMe', userCtrl.getMe);
    userRouter.post('/editMe', userCtrl.editMe);
    userRouter.delete('/deleteMe', userCtrl.deleteMe);

    return userRouter;
};