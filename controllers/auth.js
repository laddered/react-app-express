module.exports = function (app, jwt, configWT) {

    var User = require('./../models/user');

    function createUser(req, res) {
        let param = req.body;
        User.findOne({ login: param.login }, function (err, user) {
            if (err) return console.error(err);
            if (user === null) {
                let newUser = User({
                    login: param.login,
                    email: param.email,
                    password: param.password
                });
                newUser.save(function (err) {
                    if (err) return console.error(err);
                    console.log('User created!');
                });
                let token = jwt.sign({id:newUser._id},configWT.secret,{
                    expiresIn: 86400
                });
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({token: token}));
            }
            else {
                console.log(res.status + 'Found a match!');
                res.status(409).send(JSON.stringify({message: 'Matching user logins!'}));
            }
        });
    }

    function signIn(req, res) {

    }

    return {
        createUser: createUser,
        signIn: signIn
    }
};