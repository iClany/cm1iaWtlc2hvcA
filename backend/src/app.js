const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const authRoutes = require('./routes/auth.routes');
const testRoutes = require('./routes/test.routes');
const moyskladRoutes = require('./routes/moysklad.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Маршруты
app.use(routes);
app.use('/api/auth', authRoutes);
app.use('/api/test', testRoutes);
app.use('/api/moysklad', moyskladRoutes);

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Что-то пошло не так!' });
});

module.exports = app; 