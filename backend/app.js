require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const path = require('path');
const morgan = require('morgan');
const { pool } = require('./config/db'); // Импорт MySQL пула

// Импорт маршрутов
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Импорт middleware
const errorHandler = require('./middleware/errorHandler');

// Создание Express-приложения
const app = express();

// 1. GLOBAL MIDDLEWARE

// Проверка подключения к БД при старте
pool.getConnection()
  .then(conn => {
    console.log('Успешное подключение к MySQL');
    conn.release();
  })
  .catch(err => {
    console.error('Ошибка подключения к MySQL:', err);
    process.exit(1);
  });

// Безопасность HTTP-заголовков
app.use(helmet());

// Логирование запросов
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));

// Разрешение CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));

// Ограничение количества запросов
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 200,
  message: 'Слишком много запросов с этого IP, попробуйте позже'
});
app.use(limiter);

// Парсинг тела запроса
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// Парсинг cookies
app.use(cookieParser());

// Защита от XSS
app.use(xss());

// Защита от HTTP Parameter Pollution
app.use(hpp());

// Статические файлы
app.use(express.static(path.join(__dirname, 'public')));

// 2. МАРШРУТЫ
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/admin', adminRoutes);

// 3. ОБРАБОТКА ОШИБОК
app.use(errorHandler);

// 4. ОБРАБОТКА НЕСУЩЕСТВУЮЩИХ МАРШРУТОВ
app.all('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Не удалось найти ${req.originalUrl} на этом сервере`
  });
});

module.exports = app;