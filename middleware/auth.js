const jwt = require('jsonwebtoken');
const env = require('../environment');

module.exports = (req, res, next) => {
    try{
        const authorization = req.headers.authorization;
        if(authorization === undefined){
            res.status(401).json({ error : 'Missing Token' }).end();
        } else {
            const token = authorization.split(' ');
            if(token.length != 2 || token[0] !== 'Barer'){
                res.status(401).json({ error : 'Token malformed' });
            } else {
                const app = env.appId + env.appSecret;
                const decodedToken = jwt.verify(token[1], app);
                const userId = decodedToken.userId;
                req.auth = {
                    userId: userId
                };
                next();
            }
        }
    } catch(error) {
        res.status(401).json({ error : error.message});
    }
};