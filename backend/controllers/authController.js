const User = require('../models/User');
const Token = require('../models/Token');
const { sendVerificationEmail, sendPasswordResetEmail } = require('../utils/emailService');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Регистрация пользователя
exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, name, phone } = req.body;

  try {
    // Проверка на существующего пользователя
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
    }

    // Создание пользователя
    const userId = await User.create({ email, password, name, phone });
    const user = await User.findById(userId);

    // Отправка email для подтверждения
    await sendVerificationEmail(user.email, user.verification_token);

    // Генерация JWT токена
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE
    });

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        isVerified: user.is_verified
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера при регистрации' });
  }
};

// Вход пользователя
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Проверка пользователя
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Неверные учетные данные' });
    }

    // Проверка пароля
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Неверные учетные данные' });
    }

    // Проверка верификации email
    if (!user.is_verified) {
      return res.status(403).json({ 
        message: 'Email не подтвержден', 
        userId: user.id 
      });
    }

    // Генерация JWT токена
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE
    });

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        isVerified: user.is_verified,
        role: user.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера при входе' });
  }
};

// Подтверждение email
exports.verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const isVerified = await User.verifyEmail(token);
    if (!isVerified) {
      return res.status(400).json({ message: 'Неверный или устаревший токен подтверждения' });
    }

    res.status(200).json({ message: 'Email успешно подтвержден' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера при подтверждении email' });
  }
};

// Запрос на сброс пароля
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь с таким email не найден' });
    }

    const resetToken = await User.createPasswordResetToken(email);
    if (!resetToken) {
      return res.status(500).json({ message: 'Ошибка при создании токена сброса' });
    }

    await sendPasswordResetEmail(email, resetToken);

    res.status(200).json({ 
      message: 'Письмо с инструкциями по сбросу пароля отправлено на email',
      resetToken // Только для тестирования, в продакшене не отправлять
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера при запросе сброса пароля' });
  }
};

// Сброс пароля
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const success = await User.resetPassword(token, password);
    if (!success) {
      return res.status(400).json({ message: 'Неверный или устаревший токен сброса' });
    }

    res.status(200).json({ message: 'Пароль успешно изменен' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера при сбросе пароля' });
  }
};

// Повторная отправка подтверждения email
exports.resendVerification = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь с таким email не найден' });
    }

    if (user.is_verified) {
      return res.status(400).json({ message: 'Email уже подтвержден' });
    }

    // Обновляем токен подтверждения
    const newToken = uuidv4();
    await pool.execute(
      'UPDATE users SET verification_token = ? WHERE email = ?',
      [newToken, email]
    );

    await sendVerificationEmail(email, newToken);

    res.status(200).json({ message: 'Письмо с подтверждением отправлено повторно' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера при повторной отправке подтверждения' });
  }
};

// @desc    Обновление JWT токена
// @route   POST /api/auth/refresh-token
// @access  Public
exports.refreshToken = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { refreshToken } = req.body;

    // Проверяем refresh token
    const { userId } = await Token.verify(refreshToken, 'refresh');

    // Удаляем использованный refresh token
    await Token.delete(refreshToken);

    // Генерируем новую пару токенов
    const accessToken = Token.generateJWT(userId, process.env.JWT_SECRET, '15m');
    const newRefreshToken = await Token.create(userId, 'refresh');

    res.json({
      accessToken,
      refreshToken: newRefreshToken,
      tokenType: 'Bearer'
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Недействительный токен' });
  }
};

// @desc    Выход из системы
// @route   POST /api/auth/logout
// @access  Private
exports.logout = async (req, res) => {
  try {
    // Удаляем все refresh токены пользователя
    if (req.user?.id) {
      await Token.deleteAllForUser(req.user.id, 'refresh');
    }

    res.status(200).json({ message: 'Успешный выход из системы' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера при выходе из системы' });
  }
};