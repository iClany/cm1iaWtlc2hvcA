const express = require('express');
const authRoutes = require('./auth.routes');
const adminRoutes = require('./admin.routes');

const router = express.Router();

// Подключаем маршруты аутентификации
router.use('/api', authRoutes);

// Подключаем маршруты админ-панели
router.use('/api', adminRoutes);

module.exports = router; 