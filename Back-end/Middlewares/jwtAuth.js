const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const jwt_secret = process.env.JWT_SECRET;

module.exports = jwtAuth = (req, res, next) => {
    const token = req.headers.authorization;
    const user = jwt.verify(token, jwt_secret);
    if(user) {
        res.locals = user;
        next()
    }
    else {
        return res.json({status: 'error', msg: 'Authorization failed try again'});
    }
}

