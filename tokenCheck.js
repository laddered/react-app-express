function tokenCheck(req, res, next) {
    let token = req.body.token;
    console.log(token);
    let jwt = require('jsonwebtoken');
    let configWT = require('././configWebTokensJSON');

    jwt.verify(token, configWT.secret, function (err, decoded) {
        if (err) {return res.status(500).send(null)}
        else {
            req.decodedWT = decoded;
            console.log('to next');
            next()
        }
    });
}

module.exports = tokenCheck;