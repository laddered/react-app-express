module.exports = function (app, jwt, configWT) {

    let User = require('./../models/user');

    function createUser(req, res) {
        let param = req.body;
        User.findOne({ login: param.login }, function (err, user) {
            if (err) return console.error(err);
            if (user === null) {
                let newUser = User({
                    login: param.login,
                    email: param.email,
                    password: param.password,
                    isAdmin:false
                });
                newUser.save(function (err) {
                    if (err) return console.error(err);
                    console.log('User created!');
                });
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({message: 'User created!'}));
            }
            else {
                console.log(res.status + 'Found a match!');
                res.status(409).send(JSON.stringify({message: 'Matching user logins!'}));
            }
        });
    }

    function signIn(req, res) {
        let param = req.body;
        User.findOne({ login: param.login }, function (err, user) {
            if (err) return console.error(err);
            if (user !== null) {
                user.comparePassword(param.password, function(err, isMatch){
                    if (isMatch) {
                        let token = jwt.sign({id:user._id},configWT.secret,{
                            expiresIn: 86400
                        });
                        res.setHeader('Content-Type', 'application/json');
                        res.send(JSON.stringify({token: token}));
                    }
                    else {
                        res.status(400).send(JSON.stringify({message: 'Invalid password!'}));
                    }
                });
            }
            else {
                console.log('User is not found!');
                res.status(404).send(JSON.stringify({message: 'User is not found!'}));
            }
        });
    }

    function createAdmin(req, res) {
        let param = req.body;
        User.findOne({ isAdmin: true }, function (err, user) {

            if (param.adminSecret !== 'f1f55d'){
                if (user === null) {
                    let newUser = User({
                        login: 'reactStoreAdmin',
                        email: param.email,
                        password: param.password,
                        isAdmin:true
                    });
                    newUser.save(function (err) {
                        if (err) return console.error(err);
                        console.log('Admin created!');
                    });
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify({message: 'Admin created!'}));
                }
                else {
                    console.log('Failed to create admin! Wrong admin-secret.');
                    res.status(500).send(JSON.stringify({message: 'Wrong admin-secret.!'}));
                }
            }

            else {
                console.log('Failed to create admin!');
                res.status(409).send(JSON.stringify({message: 'Admin already exists!'}));
            }

        });
    }

    return {
        createUser: createUser,
        signIn: signIn,
        createAdmin: createAdmin
    }
};