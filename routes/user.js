const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

router.get('/hello', userCtrl.hw);

module.exports = router;