const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, 'this_is_secret_fuck_off');
        next();
    }
    catch(error){
        res.status(401).send({
            message: 'Authentication failed!'
        })
    }

}

module.exports = auth