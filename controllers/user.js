module.exports = function (app) {

    let User = require('./../models/user');

    function getMe(req, res) {
        if (req.decodedWT.id) {
            User.findById(req.decodedWT.id, function (err, user) {
                res.send({login:user.login, email:user.email});
            })
        } else {res.status(401).send()}
    }

    function getMyLogin(req, res) {
        if (req.decodedWT.id) {
            User.findById(req.decodedWT.id, function (err, user) {
                res.send({login:user.login, isAdmin:user.isAdmin});
            })
        } else {res.status(401).send()}
    }

    function editMe(req, res){
        let regExpLogin = /^[A-Za-z]+[A-Za-z0-9]+$/,
            regExpEmail = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,3}$/,
            regExpPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
            oldPasswordWrong = true,
            loginMatch = false,
            loginValid, emailValid, passwordValid, passwordConfirmValid,
            bcrypt = require('bcrypt'),
            SALT_WORK_FACTOR = 10;

        if(req.body.newLogin){
            loginValid = regExpLogin.test(req.body.newLogin)
        } else{loginValid = true}

        if(req.body.newEmail){
            emailValid = regExpEmail.test(req.body.newEmail)
        } else{emailValid = true}

        if(req.body.newPassword){
            passwordValid = regExpPassword.test(req.body.newPassword)
        } else{passwordValid = true}

        passwordConfirmValid = (req.body.newPassword === req.body.newPasswordConfirm);

        User.find({login:req.body.newLogin}, (err, loginMatched)=>{
            if(loginMatched.length){loginMatch = true}
        });


        if (req.decodedWT.id) {
            User.findById(req.decodedWT.id, function (err, user) {
                user.comparePassword(req.body.passwordForConfirm, function(err, passwordMatched){
                    if(passwordMatched){

                        oldPasswordWrong = false;
                        if(req.body.newLogin){
                            User.find({login:req.body.newLogin}, (err, loginMatched)=>{
                                if (!(loginMatch)) {
                                    if(loginValid){
                                        User.findOneAndUpdate({_id:user._id}, {login:req.body.newLogin}, {upsert:false}, function (err, doc){});
                                    }
                                }
                            });
                        }

                        if(req.body.newEmail){
                            if (emailValid){
                                User.findOneAndUpdate({_id:user._id}, {email:req.body.newEmail}, {upsert:false}, function (err, doc){})
                            }
                        }

                        if(req.body.newPassword){
                            if(passwordConfirmValid){
                                if (passwordValid){
                                    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
                                        if (err) return err;
                                        bcrypt.hash(req.body.newPassword, salt, function(err, hash) {
                                            if (err) return err;
                                            req.body.newPassword = hash;
                                            User.findOneAndUpdate({_id:user._id}, {password:req.body.newPassword}, {upsert:false}, function (err, doc){});
                                        });
                                    });
                                }
                            }
                        }

                        res.send({resCode:'2', data:{
                                oldPasswordWrong:oldPasswordWrong,
                                loginMatch:loginMatch,
                                loginValid:loginValid,
                                emailValid:emailValid,
                                passwordValid:passwordValid,
                                passwordConfirmValid:passwordConfirmValid}});

                    } else {res.send({resCode:'2', data:{oldPasswordWrong:oldPasswordWrong}})}
                });
            });
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