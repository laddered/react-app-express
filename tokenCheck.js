function tokenCheck(req, res, next) {
    console.log(req.body);
    let token = req.body.token;
    let jwt = require('jsonwebtoken');
    let configWT = require('././configWebTokensJSON');

    jwt.verify(token, configWT.secret, function (err, decoded) {
        if (err) {
            return res.status(500).send(JSON.stringify({message: 'Invalid or expired token'}))
        }
        else {
            req.decodedWT = decoded;
            console.log('to next');
            next()
        }
    });
}

module.exports = tokenCheck;