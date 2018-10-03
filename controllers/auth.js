module.exports = function (app, jwt, configWT) {

    var User = require('./../models/user');

    function createUser(req, res) {

    }

    function signIn(req, res) {

    }

    return {
        createUser: createUser,
        signIn: signIn
    }
};