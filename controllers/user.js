const User = require('../models/User');  
const bcrypt = require('bcrypt');  
const jwt = require('jsonwebtoken');  

exports.hw = (req, res, next) => {
    res.end('Hello World');
}