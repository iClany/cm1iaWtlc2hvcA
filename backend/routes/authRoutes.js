const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { check } = require('express-validator');

router.post(
  '/register',
  [
    check('email').isEmail().withMessage('Valid email required'),
    check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    check('name').notEmpty().withMessage('Name is required')
  ],
  authController.register
);

router.post(
  '/login',
  [
    check('email').isEmail().withMessage('Valid email required'),
    check('password').exists().withMessage('Password required')
  ],
  authController.login
);

module.exports = router;