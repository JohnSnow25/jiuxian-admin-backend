const fs = require('fs');
const jwt = require('jsonwebtoken');

const Authenticate = (req, res, next) => {
    const token = req.header('X-Access-Token');

    const publicKey = fs.readFileSync('./keys/public.key');
    jwt.verify(token, publicKey, (err, decoded) => {
        if (err) {
            res.render('users/issignin.ejs', {
                username: '',
                issignin: false
            });
        } else {
            req.username = decoded.username;
            next();
        }
    });
}

module.exports = {
    Authenticate
}