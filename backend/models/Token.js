const { pool } = require('../config/db');
const crypto = require('crypto');
const { NotFoundError, ExpiredTokenError } = require('../utils/errors');

class Token {
  /**
   * Создает токен для указанного пользователя
   * @param {number} userId - ID пользователя
   * @param {string} type - Тип токена ('refresh', 'verify', 'reset')
   * @param {number} [expiresIn] - Время жизни токена в секундах (по умолчанию 7 дней)
   * @returns {Promise<string>} Сгенерированный токен
   */
  static async create(userId, type, expiresIn = 604800) {
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + expiresIn * 1000);

    await pool.execute(
      'INSERT INTO tokens (user_id, token, type, expires_at) VALUES (?, ?, ?, ?)',
      [userId, token, type, expiresAt]
    );

    return token;
  }

  /**
   * Проверяет токен и возвращает данные
   * @param {string} token - Токен для проверки
   * @param {string} type - Тип токена
   * @returns {Promise<{userId: number, token: string}>}
   * @throws {NotFoundError} Если токен не найден
   * @throws {ExpiredTokenError} Если токен просрочен
   */
  static async verify(token, type) {
    const [rows] = await pool.execute(
      'SELECT user_id, expires_at FROM tokens WHERE token = ? AND type = ?',
      [token, type]
    );

    if (rows.length === 0) {
      throw new NotFoundError('Token not found');
    }

    const { user_id: userId, expires_at: expiresAt } = rows[0];

    if (new Date(expiresAt) < new Date()) {
      await this.delete(token);
      throw new ExpiredTokenError('Token expired');
    }

    return { userId, token };
  }

  /**
   * Удаляет токен
   * @param {string} token - Токен для удаления
   * @returns {Promise<boolean>}
   */
  static async delete(token) {
    const [result] = await pool.execute(
      'DELETE FROM tokens WHERE token = ?',
      [token]
    );
    return result.affectedRows > 0;
  }

  /**
   * Удаляет все токены пользователя определенного типа
   * @param {number} userId - ID пользователя
   * @param {string} type - Тип токена
   * @returns {Promise<boolean>}
   */
  static async deleteAllForUser(userId, type) {
    const [result] = await pool.execute(
      'DELETE FROM tokens WHERE user_id = ? AND type = ?',
      [userId, type]
    );
    return result.affectedRows > 0;
  }

  /**
   * Удаляет все просроченные токены
   * @returns {Promise<number>} Количество удаленных токенов
   */
  static async cleanupExpired() {
    const [result] = await pool.execute(
      'DELETE FROM tokens WHERE expires_at < NOW()'
    );
    return result.affectedRows;
  }

  /**
   * Генерирует JWT токен
   * @param {number} userId - ID пользователя
   * @param {string} secret - Секретный ключ
   * @param {string} [expiresIn='7d'] - Время жизни токена
   * @returns {string} JWT токен
   */
  static generateJWT(userId, secret, expiresIn = '7d') {
    return require('jsonwebtoken').sign(
      { id: userId },
      secret,
      { expiresIn }
    );
  }
}

module.exports = Token;