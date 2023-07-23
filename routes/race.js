const express = require('express');
const router = express.Router();
const raceCtrl = require('../controllers/race');
const auth = require('../middleware/auth');

router.get('/search', raceCtrl.search);

//crud
router.get('/', raceCtrl.getAll);
router.get('/:id', raceCtrl.get);
router.post('/', auth, raceCtrl.add);
router.put('/:id', auth, raceCtrl.update);
router.delete('/:id', auth, raceCtrl.delete);

module.exports = router;