import dotenv from 'dotenv';
import express from 'express';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { authenticateToken } from './authMiddleware.js';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Конфигурация
const {
  DB_HOST, DB_USER, DB_PASSWORD, DB_NAME,
  SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS,
  JWT_SECRET, AUTH_PORT,
  FRONTEND_BASE_URL = 'http://localhost:3000'
} = process.env;

// Подключение к базе данных с обработкой ошибок
let db;
try {
  db = await mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
  });
  console.log('Connected to database');
} catch (err) {
  console.error('Database connection error:', err);
  process.exit(1);
}

// Настройка почтового транспорта
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: true,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS
  }
});

// Генерация кода
const generateCode = () => Math.floor(100000 + Math.random() * 900000);

// Маршруты
app.post('/signup', async (req, res) => {
  const { email, password, role = 'user' } = req.body;

  // Валидация email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Некорректный Email' });
  }

  // Валидация пароля
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({ 
      error: 'Пароль должен содержать минимум 8 символов, включая заглавную и строчную букву, цифру и спецсимвол.' 
    });
  }

  try {
    // Проверка существующего пользователя
    const [existingUsers] = await db.execute('SELECT id FROM users WHERE email = ?', [email]);
    if (existingUsers.length > 0) {
      return res.status(400).json({ error: 'Пользователь с таким Email уже зарегистрирован' });
    }

    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = generateCode();

    // Создание пользователя
    await db.execute(
      'INSERT INTO users (email, password, role, verification_code) VALUES (?, ?, ?, ?)',
      [email, hashedPassword, role, verificationCode]
    );

    // Отправка письма
    const verifyLink = `${FRONTEND_BASE_URL}/verify-email?email=${encodeURIComponent(email)}&code=${verificationCode}`;
    
    await transporter.sendMail({
      from: 'no-reply@rmbike.by',
      to: email,
      subject: 'Подтверждение Email',
      html: `
        <p>Ваш код подтверждения: <strong>${verificationCode}</strong></p>
        <p>Или перейдите по ссылке: <a href="${verifyLink}">${verifyLink}</a></p>
      `
    });

    res.status(200).json({ message: 'Регистрация успешна. Подтвердите вашу почту.' });
  } catch (error) {
    console.error('Ошибка регистрации:', error);
    res.status(500).json({ error: 'Ошибка регистрации пользователя' });
  }
});

// Остальные маршруты остаются такими же, но с заменой хардкодженных URL на FRONTEND_BASE_URL

// Закрытие соединения при завершении приложения
process.on('SIGINT', async () => {
  try {
    await db.end();
    console.log('Database connection closed');
    process.exit(0);
  } catch (err) {
    console.error('Error closing database connection:', err);
    process.exit(1);
  }
});

// Запуск сервера
const PORT = AUTH_PORT || 3001;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));