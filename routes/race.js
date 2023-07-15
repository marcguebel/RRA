const express = require('express');
const router = express.Router();
const raceCtrl = require('../controllers/race');

router.get('/', raceCtrl.getAll);
router.get('/:id', raceCtrl.get);
router.post('/', raceCtrl.add);
router.put('/:id', raceCtrl.update);
router.delete('/:id', raceCtrl.delete);

module.exports = router;