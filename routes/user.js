const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

router.get('/hello', userCtrl.hw);
router.get('/helloAuthentified', auth, userCtrl.hwa);
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;