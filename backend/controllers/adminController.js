const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order');
const { validationResult } = require('express-validator');

// Получение списка всех пользователей
exports.getUsers = async (req, res) => {
  try {
    const [users] = await pool.execute('SELECT id, email, name, phone, role, is_verified FROM users');
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка при получении пользователей' });
  }
};

// Изменение роли пользователя
exports.updateUserRole = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const [result] = await pool.execute(
      'UPDATE users SET role = ? WHERE id = ?',
      [req.body.role, req.params.userId]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    
    res.status(200).json({ message: 'Роль пользователя обновлена' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка при обновлении роли пользователя' });
  }
};

// Получение всех заказов
exports.getOrders = async (req, res) => {
  try {
    const [orders] = await pool.execute('SELECT * FROM orders ORDER BY created_at DESC');
    
    for (const order of orders) {
      const [items] = await pool.execute(
        `SELECT oi.*, p.name, p.description 
         FROM order_items oi
         JOIN products p ON oi.product_id = p.id
         WHERE oi.order_id = ?`,
        [order.id]
      );
      order.items = items;
    }
    
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка при получении заказов' });
  }
};

// Обновление статуса заказа
exports.updateOrderStatus = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const success = await Order.updateStatus(req.params.orderId, req.body.status);
    if (!success) {
      return res.status(404).json({ message: 'Заказ не найден' });
    }
    
    res.status(200).json({ message: 'Статус заказа обновлен' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка при обновлении статуса заказа' });
  }
};