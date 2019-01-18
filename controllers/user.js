module.exports = function (app) {

    let User = require('./../models/user');

    function getMe(req, res) {
        if (req.decodedWT.id) {
            User.findById(req.decodedWT.id, function (err, user) {
                res.send({login:user.login, email:user.email});
            })
        }
        else {res.status(401).send()}
    }

    function getMyLogin(req, res) {
        if (req.decodedWT.id) {
            User.findById(req.decodedWT.id, function (err, user) {
                res.send({login:user.login, isAdmin:user.isAdmin});
            })
        }
        else {res.status(401).send()}
    }

    function editMe(req, res){
        if (req.decodedWT.id) {
            User.findById(req.decodedWT.id, function (err, user) {
                if ( req.body.login !== user.login ) {
                   User.findOne({login:req.body.login}, function (err, userWithSameLogin) {
                       if (userWithSameLogin) {
                           res.send({resCode:'3', message:'Already have a user with this login!'})
                       }
                       else {
                           User.findOneAndUpdate({id:req.decodedWT.id}, {login:req.body.login, email:req.body.email});
                           res.send({resCode:'2', message:'Login and email have been successfully changed!'})
                       }
                   })
                }
                else {
                    User.findOneAndUpdate({id:req.decodedWT.id}, {email:req.body.email});
                    res.send({resCode:'2', message:'Email have been successfully changed!'})
                }

            })
        }
        else {
            res.send({resCode:'5', message:'invalid token'})
        }
    }

    function editMyPassword(req, res) {

    }

    function deleteMe(req, res){

    }

    return {
        getMe: getMe,
        getMyLogin: getMyLogin,
        editMe: editMe,
        editMyPassword:editMyPassword,
        deleteMe: deleteMe
    }
};