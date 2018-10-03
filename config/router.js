module.exports = function(app, jwt, configWT){
    authRouter = require('../routes/auth')(app, jwt, configWT);
    app.use('/auth',authRouter);
    userRouter = require('../routes/user')(app);
    app.use('/user',userRouter);
    storeRouter = require('../routes/store')(app);
    app.use('/store',storeRouter);
};