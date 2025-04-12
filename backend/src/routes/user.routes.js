const express = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/profile', authMiddleware.authenticate, userController.getProfile);
router.put(
  '/profile',
  authMiddleware.authenticate,
  [
    body('name').optional().trim(),
    body('email').optional().isEmail().normalizeEmail()
  ],
  userController.updateProfile
);

module.exports = router; 