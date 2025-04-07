const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { protect, admin } = require('../middleware/auth');
const { check } = require('express-validator');

// Все маршруты требуют аутентификации и прав администратора
router.use(protect);
router.use(admin);

// Управление пользователями
router.get('/users', adminController.getUsers);
router.put(
  '/users/:userId/role',
  [
    check('role').isIn(['user', 'admin']).withMessage('Недопустимая роль')
  ],
  adminController.updateUserRole
);

// Управление заказами
router.get('/orders', adminController.getOrders);
router.put(
  '/orders/:orderId/status',
  [
    check('status').isIn(['pending', 'processing', 'shipped', 'delivered', 'cancelled'])
      .withMessage('Недопустимый статус')
  ],
  adminController.updateOrderStatus
);

module.exports = router;