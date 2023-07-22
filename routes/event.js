const express = require('express');
const router = express.Router();
const eventCtrl = require('../controllers/event');
const auth = require('../middleware/auth');

router.get('/search', eventCtrl.search);

//crud
router.get('/', eventCtrl.getAll);
router.get('/:id', eventCtrl.get);
router.post('/', auth, eventCtrl.add);
router.put('/:id', auth, eventCtrl.update);
router.delete('/:id', auth, eventCtrl.delete);

module.exports = router;