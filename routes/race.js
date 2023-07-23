const express = require('express');
const router = express.Router();
const raceCtrl = require('../controllers/race');
const auth = require('../middleware/auth');
const pagination = require('../middleware/pagination');

router.get('/search', pagination, raceCtrl.search);

//crud
router.get('/', pagination, raceCtrl.getAll);
router.get('/:id', raceCtrl.get);
router.post('/', auth, raceCtrl.add);
router.put('/:id', auth, raceCtrl.update);
router.delete('/:id', auth, raceCtrl.delete);

module.exports = router;