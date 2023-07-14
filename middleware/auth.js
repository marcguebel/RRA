const jwt = require('jsonwebtoken');
const env = require('../environment');

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const app = env.appId + env.appSecret;
        const decodedToken = jwt.verify(token, app);
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
        next();
    } catch(error) {
        res.status(401).json({ error : error.message});
    }
};