const app = require('./app');
const { port } = require('./config');
const { pool } = require('./config/db');

// Проверка подключения к БД перед запуском сервера
async function testDatabaseConnection() {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.ping();
    console.log('✅ Успешное подключение к MySQL');
    return true;
  } catch (err) {
    console.error('❌ Ошибка подключения к MySQL:', err.message);
    return false;
  } finally {
    if (connection) connection.release();
  }
}

// Запуск сервера
async function startServer() {
  const dbConnected = await testDatabaseConnection();
  if (!dbConnected) {
    console.error('Не удалось подключиться к базе данных');
    process.exit(1);
  }

  const server = app.listen(port, () => {
    console.log(`🚀 Сервер запущен на порту ${port} в ${process.env.NODE_ENV} режиме`);
  });

  // Обработка ошибок при закрытии сервера
  process.on('SIGTERM', () => {
    console.log('SIGTERM получен. Закрываем сервер...');
    server.close(() => {
      console.log('Сервер закрыт');
      pool.end(() => {
        console.log('Пул соединений MySQL закрыт');
        process.exit(0);
      });
    });
  });

  process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection! 💥 Ошибка:', err);
    server.close(() => process.exit(1));
  });

  process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception! 💥 Ошибка:', err);
    server.close(() => process.exit(1));
  });
}

startServer();