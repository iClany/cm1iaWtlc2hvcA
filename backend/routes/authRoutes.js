const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { check } = require('express-validator');
const rateLimit = require('express-rate-limit');

// Лимитер для защиты от brute-force атак
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 20, // Максимум 20 запросов
  message: 'Слишком много попыток, попробуйте позже'
});

// Лимитер для восстановления пароля
const passwordResetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 час
  max: 5, // Максимум 5 запросов
  message: 'Слишком много запросов на сброс пароля'
});

// @route   POST /api/auth/register
// @desc    Регистрация пользователя
// @access  Public
router.post(
  '/register',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Пароль должен быть минимум 8 символов').isLength({ min: 8 }),
    check('name', 'Имя обязательно').notEmpty(),
    check('phone', 'Некорректный номер телефона').optional().isMobilePhone()
  ],
  authLimiter,
  authController.register
);

// @route   POST /api/auth/login
// @desc    Аутентификация пользователя
// @access  Public
router.post(
  '/login',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Пароль обязателен').exists()
  ],
  authLimiter,
  authController.login
);

// @route   GET /api/auth/verify-email/:token
// @desc    Подтверждение email
// @access  Public
router.get(
  '/verify-email/:token',
  authController.verifyEmail
);

// @route   POST /api/auth/resend-verification
// @desc    Повторная отправка подтверждения email
// @access  Public
router.post(
  '/resend-verification',
  [
    check('email', 'Некорректный email').isEmail()
  ],
  authLimiter,
  authController.resendVerification
);

// @route   POST /api/auth/forgot-password
// @desc    Запрос на сброс пароля
// @access  Public
router.post(
  '/forgot-password',
  [
    check('email', 'Некорректный email').isEmail()
  ],
  passwordResetLimiter,
  authController.forgotPassword
);

// @route   POST /api/auth/reset-password/:token
// @desc    Сброс пароля
// @access  Public
router.post(
  '/reset-password/:token',
  [
    check('password', 'Пароль должен быть минимум 8 символов').isLength({ min: 8 })
  ],
  authController.resetPassword
);

// @route   POST /api/auth/refresh-token
// @desc    Обновление JWT токена
// @access  Public
router.post(
  '/refresh-token',
  [
    check('refreshToken', 'Refresh token обязателен').notEmpty()
  ],
  authController.refreshToken
);

// @route   POST /api/auth/logout
// @desc    Выход из системы
// @access  Private
router.post(
  '/logout',
  authController.logout
);

module.exports = router;