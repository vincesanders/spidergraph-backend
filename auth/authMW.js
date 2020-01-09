const jwt = require('jsonwebtoken');
const secret = require('./authSecrets');

const vaildateToken = (req,res,next) => {
    const token = req.headers.token
    token
    ? jwt.verify(token,secret.jwtSecret)
    ? next()
    : res.status(401).json({message: 'You must have a token to access this endpoint.'})
    : res.status(401).json({message: 'You must have a token to access this endpoint.'});
}

module.exports = vaildateToken;