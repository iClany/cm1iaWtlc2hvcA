const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const { check } = require('express-validator');

router.get('/me', protect, userController.getMe);
router.put(
  '/me',
  protect,
  [
    check('name', 'Имя обязательно').notEmpty(),
    check('phone', 'Некорректный номер телефона').optional().isMobilePhone()
  ],
  userController.updateMe
);

router.put(
  '/change-password',
  protect,
  [
    check('currentPassword', 'Текущий пароль обязателен').notEmpty(),
    check('newPassword', 'Новый пароль должен быть минимум 8 символов').isLength({ min: 8 })
  ],
  userController.changePassword
);

router.get('/orders', protect, userController.getMyOrders);
router.delete('/me', protect, userController.deleteMe);
router.get('/check-email', userController.checkEmail);

module.exports = router;