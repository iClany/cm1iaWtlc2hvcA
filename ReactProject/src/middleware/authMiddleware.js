import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../errors/customErrors.js';
import pool from '../config/database.js';

export const authenticateToken = async (req, res, next) => {
  try {
    // 1. Проверка токена в cookies или headers
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      throw new UnauthorizedError('Требуется авторизация');
    }

    // 2. Верификация токена
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3. Проверка пользователя в БД
    const [user] = await pool.query(
      'SELECT id, email, role, verified FROM users WHERE id = ?',
      [decoded.id]
    );

    if (!user.length) {
      throw new UnauthorizedError('Пользователь не найден');
    }

    // 4. Добавление пользователя в запрос
    req.user = user[0];
    next();
  } catch (error) {
    next(error);
  }
};