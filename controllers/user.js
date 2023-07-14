const User = require('../models/User');  
const bcrypt = require('bcrypt');  
const jwt = require('jsonwebtoken');  
const env = require('../environment');
const crypto = require('crypto');

exports.hw = (req, res, next) => {
    res.end('Hello World !');
}

exports.hwa = (req, res, next) => {
    res.end('Hello World, you are authentified !');
}

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const appId = generateRandomString(36);
            const appSecret = generateRandomString(36);
            const user = new User({
                email: req.body.email,
                password: hash,
                appId: appId,
                appSecret: appSecret
            });
            user.save()
                .then(() => res.status(201).json({
                    msg: 'Utilisateur créé !',
                    appId: appId,
                    appSecret: appSecret,
                }))
                .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if(user===null){
                res.status(401).json({msg: 'Incorrect login'})
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if(!valid){
                            res.status(401).json({msg: 'Incorrect login'});
                        } else {
                            res.status(200).json({
                                userId: user._id,
                                token: jwt.sign(
                                    { userId: user._id },
                                    user.appId + user.appSecret,
                                    { expiresIn: '24h' }
                                )
                            });
                        }
                    })
                    .catch(error => res.status(500).json({error}));
            }
        })
        .catch(error => res.status(500).json({error}));
};

function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}