import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import authRoutes from './api/auth/routes.js';
import shopRoutes from './api/shop/routes.js'; // Существующие маршруты магазина
import adminRoutes from './api/admin/routes.js'; // Админ-маршруты
import { notFoundMiddleware, errorHandlerMiddleware } from './middleware/errorMiddleware.js';
import connectDB from './config/database.js';

// Загрузка переменных окружения
config({ path: './.env' });

// Инициализация Express
const app = express();

// Подключение к базе данных
connectDB();

// Мидлвары безопасности
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

// Лимитер запросов
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // лимит каждого IP
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Логирование
app.use(morgan('dev'));

// Парсинг данных
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Статические файлы
app.use('/uploads', express.static('uploads'));

// Основные маршруты
app.get('/', (req, res) => {
  res.json({ 
    success: true,
    message: 'Добро пожаловать в RMBikeShop API',
    version: '1.0.0'
  });
});

// API Routes
app.use('/api/auth', authRoutes); // Маршруты аутентификации
app.use('/api/shop', shopRoutes); // Существующие маршруты магазина
app.use('/api/admin', adminRoutes); // Админ-маршруты

// Обработка ошибок
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// Запуск сервера
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Сервер запущен в ${process.env.NODE_ENV} режиме на порту ${PORT}`);
});

// Обработка неожиданных ошибок
process.on('unhandledRejection', (err) => {
  console.error(`Ошибка: ${err.message}`);
  server.close(() => process.exit(1));
});

export default app;