# Система аутентификации

Полноценная система аутентификации с использованием React и Express.js.

## Технологии

### Backend
- Node.js
- Express.js
- MySQL
- JWT для аутентификации
- Nodemailer для отправки email
- Bcrypt для хеширования паролей

### Frontend
- React
- React Router
- Axios для HTTP запросов
- CSS для стилизации

## Установка

1. Клонируйте репозиторий:
```bash
git clone <repository-url>
cd <repository-name>
```

2. Установите все зависимости:
```bash
npm run install:all
```

## Настройка

1. Создайте базу данных MySQL:
```bash
mysql -u root -p < backend/src/config/init.sql
```

2. Настройте переменные окружения в файле `backend/.env`:
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=auth_db
JWT_SECRET=your_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_email_password
FRONTEND_URL=http://localhost:3000
```

## Запуск

Запустите весь проект одной командой:
```bash
npm start
```

Или запустите отдельные части:
```bash
npm run start:backend  # только backend
npm run start:frontend # только frontend
```

## Функциональность

- Регистрация пользователей
- Вход в систему
- Верификация email
- Защищенные маршруты
- Обновление профиля
- Выход из системы

## API Endpoints

### Аутентификация
- POST /api/auth/register - Регистрация нового пользователя
- POST /api/auth/login - Вход в систему
- GET /api/auth/verify-email/:token - Верификация email

### Пользователь
- GET /api/user/profile - Получение профиля пользователя
- PUT /api/user/profile - Обновление профиля пользователя 