const User = require('../models/User');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// @desc    Получить данные текущего пользователя
// @route   GET /api/users/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    res.status(200).json({
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: user.role,
      isVerified: user.is_verified
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// @desc    Обновить данные пользователя
// @route   PUT /api/users/me
// @access  Private
exports.updateMe = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, phone } = req.body;
    const updated = await User.update(req.user.id, { name, phone });

    if (!updated) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    const user = await User.findById(req.user.id);
    res.status(200).json({
      message: 'Данные обновлены',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        role: user.role,
        isVerified: user.is_verified
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера при обновлении данных' });
  }
};

// @desc    Изменить пароль
// @route   PUT /api/users/change-password
// @access  Private
exports.changePassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findByEmail(req.user.email);

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    // Проверка текущего пароля
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Текущий пароль неверен' });
    }

    // Обновление пароля
    const updated = await User.updatePassword(user.id, newPassword);
    if (!updated) {
      return res.status(500).json({ message: 'Ошибка при изменении пароля' });
    }

    res.status(200).json({ message: 'Пароль успешно изменен' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера при изменении пароля' });
  }
};

// @desc    Получить историю заказов пользователя
// @route   GET /api/users/orders
// @access  Private
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.getByUserId(req.user.id);
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера при получении заказов' });
  }
};

// @desc    Удалить аккаунт (мягкое удаление)
// @route   DELETE /api/users/me
// @access  Private
exports.deleteMe = async (req, res) => {
  try {
    // Вместо реального удаления помечаем пользователя как неактивного
    const [result] = await pool.execute(
      'UPDATE users SET is_active = FALSE WHERE id = ?',
      [req.user.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    // Можно также добавить инвалидацию токенов и т.д.
    res.status(200).json({ message: 'Аккаунт успешно деактивирован' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера при удалении аккаунта' });
  }
};

// @desc    Проверить, занят ли email
// @route   GET /api/users/check-email
// @access  Public
exports.checkEmail = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ message: 'Email обязателен' });
    }

    const user = await User.findByEmail(email);
    res.status(200).json({ available: !user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера при проверке email' });
  }
};