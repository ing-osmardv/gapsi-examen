const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Welcome
router.get('', authController.getWelcome);

module.exports = router;