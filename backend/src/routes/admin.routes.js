const express = require('express');
const adminController = require('../controllers/admin.controller');

const router = express.Router();

// Проверка прав администратора
router.get('/check-admin', adminController.checkAdmin);

// Получение списка пользователей
router.get('/users', adminController.getUsers);

// Обновление статуса пользователя
router.patch('/users/:userId/status', adminController.updateUserStatus);

module.exports = router; 