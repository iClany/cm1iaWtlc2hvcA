const pool = require('../config/db');

class Order {
  // Создание заказа
  static async create({ userId, items, total, address, status = 'pending' }) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      // Создаем заказ
      const [orderResult] = await connection.execute(
        'INSERT INTO orders (user_id, total, address, status) VALUES (?, ?, ?, ?)',
        [userId, total, address, status]
      );
      const orderId = orderResult.insertId;

      // Добавляем товары в заказ
      for (const item of items) {
        await connection.execute(
          'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
          [orderId, item.productId, item.quantity, item.price]
        );
      }

      await connection.commit();
      return orderId;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  // Получение заказов пользователя
  static async getByUserId(userId) {
    const [orders] = await pool.execute(
      'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );

    // Получаем товары для каждого заказа
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

    return orders;
  }

  // Обновление статуса заказа
  static async updateStatus(orderId, status) {
    const [result] = await pool.execute(
      'UPDATE orders SET status = ? WHERE id = ?',
      [status, orderId]
    );
    return result.affectedRows > 0;
  }
}

module.exports = Order;