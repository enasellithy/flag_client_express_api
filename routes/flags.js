const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { createFlag, getFlags, updateFlag } = require('../controllers/flagsController');

router.post(
  '/',
  [
    body('flagName').notEmpty().withMessage('flagName is required'),
    body('description').notEmpty().withMessage('description is required'),
    body('enabledByDefault').isBoolean().withMessage('enabledByDefault must be a boolean')
  ],
  createFlag
);
router.get('/', getFlags);
router.patch('/:flagName', updateFlag);

module.exports = router;