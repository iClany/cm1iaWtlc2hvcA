const express = require('express');
const { body, validationResult } = require('express-validator');
const authController = require('../controllers/auth.controller');

const router = express.Router();

// Валидация для регистрации
const registerValidation = [
  body('email')
    .isEmail()
    .withMessage('Пожалуйста, введите корректный email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Пароль должен содержать минимум 6 символов')
    .matches(/\d/)
    .withMessage('Пароль должен содержать хотя бы одну цифру'),
  body('name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Имя должно содержать минимум 2 символа')
    .escape()
];

// Валидация для входа
const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Пожалуйста, введите корректный email')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Пожалуйста, введите пароль')
];

// Валидация для запроса сброса пароля
const requestPasswordResetValidation = [
  body('email')
    .isEmail()
    .withMessage('Пожалуйста, введите корректный email')
    .normalizeEmail()
];

// Валидация для сброса пароля
const resetPasswordValidation = [
  body('token')
    .notEmpty()
    .withMessage('Токен сброса пароля обязателен'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('Пароль должен содержать минимум 6 символов')
    .matches(/\d/)
    .withMessage('Пароль должен содержать хотя бы одну цифру')
];

// Маршруты
router.post('/register', registerValidation, authController.register);
router.post('/login', loginValidation, authController.login);
router.get('/verify-email', authController.verifyEmail);
router.post('/request-password-reset', requestPasswordResetValidation, authController.requestPasswordReset);
router.post('/reset-password', resetPasswordValidation, authController.resetPassword);

module.exports = router; 