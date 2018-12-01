module.exports = function(app, jwt, configWT){
    authzRouter = require('../routes/authz')(app, jwt, configWT);
    app.use('/authz',authzRouter);
    userRouter = require('../routes/user')(app);
    app.use('/user',userRouter);
    storeRouter = require('../routes/store')(app);
    app.use('/store',storeRouter);
};