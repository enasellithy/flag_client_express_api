const express = require('express');
const router = express.Router();
const clientsController = require('../controllers/clientsController');

router.post('/', clientsController.registerClient);
router.post('/:clientId/flags', clientsController.overrideFlag);
router.get('/:clientId/flags', clientsController.getClientFlags);
router.get('/:clientId/effective-flags', clientsController.getEffectiveFlags);

module.exports = router;
