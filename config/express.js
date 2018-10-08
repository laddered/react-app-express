module.exports = function (app) {

    let jwt = require('jsonwebtoken');
    let configWT = require('./../configWebTokensJSON');

    bcrypt = require('bcrypt'),
        SALT_WORK_FACTOR = 10;

    let bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    let mongoose = require('mongoose');
    let mongoDB = 'mongodb://localhost:27017/express-app-db';
    mongoose.connect(mongoDB, { useNewUrlParser: true });
    mongoose.Promise = global.Promise;
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));

    require('./router')(app, jwt, configWT);
};