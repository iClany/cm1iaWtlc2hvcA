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

const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});


const generateCode = () => Math.floor(100000 + Math.random() * 900000);

app.post('/singup', async (req, res) => {
    const { email, password, role = 'user' } = req.body;

    // Регулярное выражение для проверки Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Некорректный Email' });
    }

    // Проверка сложности пароля
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ error: 'Пароль должен содержать минимум 8 символов, включая заглавную и строчную букву, цифру и спецсимвол.' });
    }

    try {
        // Проверяем, существует ли уже такой email
        const [existingUsers] = await db.execute('SELECT id FROM users WHERE email = ?', [email]);
        if (existingUsers.length > 0) {
            return res.status(400).json({ error: 'Пользователь с таким Email уже зарегистрирован' });
        }

        // Хешируем пароль
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationCode = generateCode();

        // Добавляем пользователя в базу данных
        await db.execute(
            'INSERT INTO users (email, password, role, verification_code) VALUES (?, ?, ?, ?)',
            [email, hashedPassword, role, verificationCode]
        );

        // Формируем ссылку для подтверждения
        const verifyLink = `http://192.168.100.4:3000/verify-email?email=${email}&code=${verificationCode}`;

        // Отправляем письмо
        await transporter.sendMail({
            from: 'no-reply@rmbike.by',
            to: email,
            subject: 'Подтверждение Email',
            text: `Ваш код подтверждения: ${verificationCode}\nИли перейдите по ссылке: ${verifyLink}`
        });

        res.status(200).json({ message: 'Регистрация успешна. Подтвердите вашу почту.' });
    } catch (error) {
        console.error('Ошибка регистрации:', error);
        res.status(500).json({ error: 'Ошибка регистрации пользователя' });
    }
});
app.post('/verify-email', async (req, res) => {
    const { email, code } = req.body;

    if (!email || !code) {
        return res.status(400).json({ error: 'Email и код обязательны' });
    }
    try {
        const [rows] = await db.execute(
            'SELECT * FROM users WHERE email = ? AND verification_code = ?',
            [email, code]
        );
        if (rows.length === 0) {
            return res.status(400).json({ error: 'Неверный код подтверждения' });
        }
        await db.execute(
            'UPDATE users SET verified = 1, verification_code = NULL WHERE email = ?',
            [email]
        );
        res.json({ message: 'Email подтверждён' });
    } catch (error) {
        console.error('Ошибка подтверждения Email:', error);
        res.status(500).json({ error: 'Ошибка при подтверждении Email' });
    }
});

app.post('/resend-code', async (req, res) => {
    const { email } = req.body;
    const newCode = generateCode();
    const verificationLink = `http://192.168.100.4:3000/verify-email?email=${email}&code=${newCode}`;
    try {
        await db.execute('UPDATE users SET verification_code = ? WHERE email = ?', [newCode, email]);
        await transporter.sendMail({
            from: 'no-reply@rmbike.by',
            to: email,
            subject: 'Повторное подтверждение Email',
            text: `Ваш новый код подтверждения: ${newCode}\n\nПерейдите по ссылке для подтверждения: ${verificationLink}`
        });
        res.json({ message: 'Новый код подтверждения отправлен' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка повторной отправки кода' });
    }
});

app.post('/auth', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email и пароль обязательны' });
    }

    try {
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);

        if (rows.length === 0) {
            return res.status(400).json({ error: 'Пользователь не найден' });
        }

        const user = rows[0];

        if (!user.verified) {
            return res.status(403).json({ error: 'Email не подтверждён' }); // 403 логичнее
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: 'Неверный пароль' }); // 401 — ошибка авторизации
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            token,
            role: user.role,
            email: user.email
        });

    } catch (error) {
        console.error("Ошибка входа:", error);
        res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
});

app.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    const resetCode = generateCode();

    try {
        // Проверяем, есть ли email в базе
        const [rows] = await db.execute('SELECT id FROM users WHERE email = ?', [email]);
        if (rows.length === 0) {
            console.log(`Email ${email} не найден в базе`);
            return res.status(400).json({ error: 'Пользователь с таким email не найден' });
        }
        // Обновляем код восстановления
        await db.execute('UPDATE users SET reset_code = ? WHERE email = ?', [resetCode, email]);
        // Формирование ссылки
        const resetLink = `http://192.168.100.4:3000/reset-password?email=${email}&code=${resetCode}`;
        // Отправляем письмо
        await transporter.sendMail({
            from: 'no-reply@rmbike.by',
            to: email,
            subject: 'Восстановление пароля',
            text: `Ваш код: ${resetCode}\nИли перейдите по ссылке: ${resetLink}`
        });

        res.json({ message: 'Код восстановления отправлен на email' });
    } catch (error) {
        console.error('Ошибка восстановления пароля:', error.stack);
        res.status(500).json({ error: 'Ошибка отправки кода восстановления' });
    }
});


app.post('/reset-password', async (req, res) => {
    const { email, code, newPassword } = req.body;

    if (!newPassword) {
        return res.status(400).json({ error: 'Новый пароль обязателен' });
    }

    try {
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ? AND reset_code = ?', [email, code]);
        if (rows.length === 0) {
            return res.status(400).json({ error: 'Неверный код восстановления' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await db.execute('UPDATE users SET password = ?, reset_code = NULL WHERE email = ?', [hashedPassword, email]);

        res.json({ message: 'Пароль успешно изменён' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ошибка смены пароля' });
    }
});

app.get('/profile', authenticateToken, async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT id, email, role, verified FROM users WHERE id = ?', [req.user.id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Пользователь не найден' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error('Ошибка получения профиля:', error);
        res.status(500).json({ error: 'Ошибка сервера при получении профиля' });
    }
});

const PORT = process.env.AUTH_PORT;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));