const express = require('express');
const router = express.Router();
const testController = require('../controllers/test.controller');

router.post('/send-email', testController.sendCustomEmail);

module.exports = router; 