const db = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  static async create({ email, password, name }) {
    try {
      // Хеширование пароля
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Создание пользователя
      const [result] = await db.execute(
        'INSERT INTO users (email, password, name, isVerified) VALUES (?, ?, ?, ?)',
        [email, hashedPassword, name, false]
      );

      return {
        id: result.insertId,
        email,
        name,
        isVerified: false
      };
    } catch (error) {
      console.error('Ошибка при создании пользователя:', error);
      throw error;
    }
  }

  static async findByEmail(email) {
    try {
      const [rows] = await db.execute(
        'SELECT id, email, password, name, isVerified, isActive, isAdmin FROM users WHERE email = ?',
        [email]
      );
      return rows[0] || null;
    } catch (error) {
      console.error('Ошибка при поиске пользователя по email:', error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const [rows] = await db.execute(
        'SELECT id, email, name, isVerified, isActive, isAdmin FROM users WHERE id = ?',
        [id]
      );
      return rows[0] || null;
    } catch (error) {
      console.error('Ошибка при поиске пользователя по ID:', error);
      throw error;
    }
  }

  static async verifyEmail(userId) {
    try {
      const [result] = await db.execute(
        'UPDATE users SET isVerified = true WHERE id = ?',
        [userId]
      );
      return result;
    } catch (error) {
      console.error('Ошибка при верификации email:', error);
      throw error;
    }
  }

  static async updatePassword(userId, newPassword) {
    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const [result] = await db.execute(
        'UPDATE users SET password = ? WHERE id = ?',
        [hashedPassword, userId]
      );
      return result;
    } catch (error) {
      console.error('Ошибка при обновлении пароля:', error);
      throw error;
    }
  }

  static async updateProfile(id, { name, email, password }) {
    let query = 'UPDATE users SET ';
    const params = [];
    
    if (name) {
      query += 'name = ?, ';
      params.push(name);
    }
    if (email) {
      query += 'email = ?, ';
      params.push(email);
    }
    if (password) {
      query += 'password = ?, ';
      params.push(password);
    }

    // Удаляем последнюю запятую и пробел
    query = query.slice(0, -2);
    query += ' WHERE id = ?';
    params.push(id);

    const [result] = await db.execute(query, params);
    return result.affectedRows > 0;
  }

  static async getAll() {
    try {
      const [rows] = await db.execute(
        'SELECT id, email, name, isVerified, isActive, isAdmin FROM users'
      );
      return rows;
    } catch (error) {
      console.error('Ошибка при получении списка пользователей:', error);
      throw error;
    }
  }

  static async updateStatus(userId, isActive) {
    try {
      const [result] = await db.execute(
        'UPDATE users SET isActive = ? WHERE id = ?',
        [isActive, userId]
      );
      return result;
    } catch (error) {
      console.error('Ошибка при обновлении статуса пользователя:', error);
      throw error;
    }
  }
}

module.exports = User; 