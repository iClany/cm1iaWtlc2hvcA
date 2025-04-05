import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import pool from '../db.js';
import { generateRandomCode } from '../../utils/helpers.js';

// Конфигурация JWT
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

// Конфигурация почтового сервиса
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Валидация email
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Валидация пароля
const validatePassword = (password) => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return re.test(password);
};

export const signup = async (req, res) => {
  const { email, password, name } = req.body;

  // Валидация входных данных
  if (!validateEmail(email)) {
    return res.status(400).json({ success: false, message: 'Некорректный email' });
  }

  if (!validatePassword(password)) {
    return res.status(400).json({ 
      success: false, 
      message: 'Пароль должен содержать минимум 8 символов, включая заглавные и строчные буквы, цифры и спецсимволы' 
    });
  }

  try {
    // Проверка существующего пользователя
    const [existingUsers] = await pool.query(
      'SELECT id FROM users WHERE email = ?', 
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({ 
        success: false, 
        message: 'Пользователь с таким email уже существует' 
      });
    }

    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 12);
    const verificationCode = generateRandomCode(6);

    // Создание пользователя
    const [result] = await pool.query(
      `INSERT INTO users 
      (email, password, name, verification_code, role) 
      VALUES (?, ?, ?, ?, 'user')`,
      [email, hashedPassword, name, verificationCode]
    );

    // Отправка письма с подтверждением
    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?email=${encodeURIComponent(email)}&code=${verificationCode}`;

    await transporter.sendMail({
      from: `"RMBikeShop" <${process.env.SMTP_FROM}>`,
      to: email,
      subject: 'Подтверждение email',
      html: `
        <h2>Добро пожаловать в RMBikeShop!</h2>
        <p>Ваш код подтверждения: <strong>${verificationCode}</strong></p>
        <p>Или перейдите по ссылке: <a href="${verificationLink}">Подтвердить email</a></p>
      `
    });

    res.status(201).json({ 
      success: true, 
      message: 'Регистрация успешна. Проверьте ваш email для подтверждения.' 
    });

  } catch (error) {
    console.error('Ошибка регистрации:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка сервера при регистрации' 
    });
  }
};

export const verifyEmail = async (req, res) => {
  const { email, code } = req.body;

  try {
    const [users] = await pool.query(
      'SELECT * FROM users WHERE email = ? AND verification_code = ?',
      [email, code]
    );

    if (users.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Неверный код подтверждения' 
      });
    }

    await pool.query(
      'UPDATE users SET verified = TRUE, verification_code = NULL WHERE email = ?',
      [email]
    );

    res.json({ 
      success: true, 
      message: 'Email успешно подтвержден' 
    });

  } catch (error) {
    console.error('Ошибка подтверждения email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка сервера при подтверждении email' 
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ 
        success: false, 
        message: 'Неверные учетные данные' 
      });
    }

    const user = users[0];

    // Проверка подтверждения email
    if (!user.verified) {
      return res.status(403).json({ 
        success: false, 
        message: 'Email не подтвержден' 
      });
    }

    // Проверка пароля
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false, 
        message: 'Неверные учетные данные' 
      });
    }

    // Генерация JWT токена
    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Исключаем пароль из ответа
    const { password: _, ...userData } = user;

    res.json({ 
      success: true,
      token,
      user: userData
    });

  } catch (error) {
    console.error('Ошибка входа:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка сервера при входе' 
    });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const [users] = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Пользователь с таким email не найден' 
      });
    }

    const resetCode = generateRandomCode(6);
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?email=${encodeURIComponent(email)}&code=${resetCode}`;

    await pool.query(
      'UPDATE users SET reset_code = ?, reset_code_expires = DATE_ADD(NOW(), INTERVAL 1 HOUR) WHERE email = ?',
      [resetCode, email]
    );

    await transporter.sendMail({
      from: `"RMBikeShop" <${process.env.SMTP_FROM}>`,
      to: email,
      subject: 'Восстановление пароля',
      html: `
        <h2>Восстановление пароля</h2>
        <p>Ваш код для восстановления: <strong>${resetCode}</strong></p>
        <p>Или перейдите по ссылке: <a href="${resetLink}">Восстановить пароль</a></p>
        <p>Код действителен в течение 1 часа.</p>
      `
    });

    res.json({ 
      success: true, 
      message: 'Инструкции по восстановлению отправлены на email' 
    });

  } catch (error) {
    console.error('Ошибка восстановления пароля:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка сервера при восстановлении пароля' 
    });
  }
};

export const resetPassword = async (req, res) => {
  const { email, code, newPassword } = req.body;

  try {
    // Проверка кода восстановления
    const [users] = await pool.query(
      `SELECT * FROM users 
      WHERE email = ? 
      AND reset_code = ? 
      AND reset_code_expires > NOW()`,
      [email, code]
    );

    if (users.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Неверный или просроченный код восстановления' 
      });
    }

    if (!validatePassword(newPassword)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Новый пароль не соответствует требованиям безопасности' 
      });
    }

    // Хеширование нового пароля
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Обновление пароля и очистка кода восстановления
    await pool.query(
      `UPDATE users 
      SET password = ?, 
          reset_code = NULL, 
          reset_code_expires = NULL 
      WHERE email = ?`,
      [hashedPassword, email]
    );

    res.json({ 
      success: true, 
      message: 'Пароль успешно изменен' 
    });

  } catch (error) {
    console.error('Ошибка сброса пароля:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка сервера при сбросе пароля' 
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const [users] = await pool.query(
      'SELECT id, email, name, role, verified FROM users WHERE id = ?',
      [req.user.id]
    );

    if (users.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Пользователь не найден' 
      });
    }

    res.json({ 
      success: true, 
      user: users[0] 
    });

  } catch (error) {
    console.error('Ошибка получения профиля:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка сервера при получении профиля' 
    });
  }
};