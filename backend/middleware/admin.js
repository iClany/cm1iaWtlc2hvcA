const { pool } = require('../config/db');
const { ForbiddenError } = require('../utils/errors');

/**
 * Middleware для проверки прав администратора
 * @throws {ForbiddenError} Если пользователь не администратор
 */
module.exports = async (req, res, next) => {
  try {
    // Проверяем, что пользователь аутентифицирован (должно быть установлено authMiddleware)
    if (!req.user) {
      throw new ForbiddenError('Доступ запрещен: требуется авторизация');
    }

    // Проверяем роль пользователя в базе данных (актуальные данные)
    const [rows] = await pool.execute(
      'SELECT role FROM users WHERE id = ?',
      [req.user.id]
    );

    if (rows.length === 0 || rows[0].role !== 'admin') {
      throw new ForbiddenError('Доступ запрещен: требуются права администратора');
    }

    // Если проверки пройдены - разрешаем доступ
    next();
  } catch (error) {
    next(error);
  }
};