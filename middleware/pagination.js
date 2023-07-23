const Tool = require('../controllers/tool');  

module.exports = (req, res, next) => {
    try{
        let limit = parseInt(Math.abs(Tool.cleanParameter(req.query.limit)));
        let page = parseInt(Math.abs(Tool.cleanParameter(req.query.page)));

        if(limit>100 || isNaN(limit) || limit === 0){
            limit = 100;
        }
        if(isNaN(page) || page === 0){
            page = 1;
        }
        const offset = (page * limit - limit);
        const pagination = {
            limit : limit,
            offset : offset
        };
        req.pagination = pagination;
        next();
    } catch(error) {
        res.status(401).json({ error : error.message});
    }
};