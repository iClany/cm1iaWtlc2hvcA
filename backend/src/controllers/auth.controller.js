const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const emailService = require('../services/email.service');
const { validationResult } = require('express-validator');

class AuthController {
  async register(req, res) {
    try {
      console.log('Получен запрос на регистрацию:', req.body);
      
      // Проверка валидации
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log('Ошибки валидации:', errors.array());
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password, name } = req.body;

      // Проверка существования пользователя
      console.log('Проверка существования пользователя:', email);
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        console.log('Пользователь уже существует:', email);
        return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
      }

      // Создание пользователя
      console.log('Создание нового пользователя:', { email, name });
      const user = await User.create({ email, password, name });
      console.log('Пользователь создан:', { userId: user.id, email: user.email, name: user.name });

      // Генерация токена верификации
      const verificationToken = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      // Формирование URL для верификации
      const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
      console.log('Отправка письма подтверждения:', {
        to: email,
        verificationUrl
      });

      // Отправка письма
      await emailService.sendVerificationEmail(email, verificationUrl);
      console.log('Email отправлен');

      res.status(201).json({
        message: 'Регистрация успешна. Пожалуйста, проверьте ваш email для подтверждения.',
        userId: user.id
      });
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      res.status(500).json({
        message: 'Ошибка при регистрации',
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  }

  async verifyEmail(req, res) {
    try {
      const { token } = req.query;
      console.log('Получен запрос на верификацию email с токеном:', token);

      if (!token) {
        console.log('Токен не предоставлен');
        return res.status(400).json({ message: 'Токен подтверждения не найден' });
      }

      // Верификация токена
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Токен расшифрован:', decoded);

      // Обновление статуса пользователя
      const result = await User.verifyEmail(decoded.userId);
      console.log('Результат верификации:', result);

      if (result.affectedRows === 0) {
        console.log('Пользователь не найден:', decoded.userId);
        return res.status(404).json({ message: 'Пользователь не найден' });
      }

      res.status(200).json({ message: 'Email успешно подтвержден' });
    } catch (error) {
      console.error('Ошибка при верификации email:', error);
      
      if (error.name === 'JsonWebTokenError') {
        return res.status(400).json({ message: 'Недействительный токен' });
      }
      
      if (error.name === 'TokenExpiredError') {
        return res.status(400).json({ message: 'Срок действия токена истек' });
      }

      res.status(500).json({
        message: 'Ошибка при верификации email',
        error: error.message
      });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      console.log('Получен запрос на вход:', { email });

      // Поиск пользователя
      const user = await User.findByEmail(email);
      if (!user) {
        console.log('Пользователь не найден:', email);
        return res.status(401).json({ message: 'Неверный email или пароль' });
      }

      // Проверка верификации email
      if (!user.isVerified) {
        console.log('Email не верифицирован:', email);
        return res.status(401).json({ message: 'Пожалуйста, подтвердите ваш email' });
      }

      // Проверка пароля
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        console.log('Неверный пароль для пользователя:', email);
        return res.status(401).json({ message: 'Неверный email или пароль' });
      }

      // Генерация JWT токена
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      console.log('Успешный вход пользователя:', { userId: user.id, email: user.email });
      res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      });
    } catch (error) {
      console.error('Ошибка при входе:', error);
      res.status(500).json({
        message: 'Ошибка при входе',
        error: error.message
      });
    }
  }

  async requestPasswordReset(req, res) {
    try {
      const { email } = req.body;

      // Поиск пользователя
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(404).json({ message: 'Пользователь с таким email не найден' });
      }

      // Генерация токена для сброса пароля
      const resetToken = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

      // Отправка email для сброса пароля
      await emailService.sendPasswordResetEmail(email, resetUrl);

      res.status(200).json({ message: 'Инструкции по сбросу пароля отправлены на ваш email' });
    } catch (error) {
      console.error('Ошибка запроса сброса пароля:', error);
      res.status(500).json({ message: 'Ошибка при запросе сброса пароля' });
    }
  }

  async resetPassword(req, res) {
    try {
      const { token, newPassword } = req.body;

      // Верификация токена
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);

      if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' });
      }

      // Хеширование нового пароля
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await User.updateProfile(user.id, { password: hashedPassword });

      res.status(200).json({ message: 'Пароль успешно изменен' });
    } catch (error) {
      console.error('Ошибка сброса пароля:', error);
      res.status(400).json({ message: 'Недействительный или истекший токен' });
    }
  }
}

module.exports = new AuthController(); 