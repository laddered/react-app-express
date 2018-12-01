module.exports = function (app) {

    let User = require('./../models/user');

    function getMe(req, res) {

    }

    function getMyLogin(req, res) {
        if (req.decodedWT.id) {
            User.findById(req.decodedWT.id, function (err, user) {
                res.send({login:user.login});
            })
        }
        else {res.status(401).send()}
    }

    function editMe(req, res){

    }

    function deleteMe(req, res){

    }

    return {
        getMe: getMe,
        getMyLogin: getMyLogin,
        editMe: editMe,
        deleteMe: deleteMe
    }
};