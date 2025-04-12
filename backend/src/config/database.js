const mysql = require('mysql2/promise');
require('dotenv').config();

// Создание пула соединений
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Проверка соединения при запуске
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Успешное подключение к базе данных');
    connection.release();
  } catch (error) {
    console.error('Ошибка подключения к базе данных:', error);
    throw error;
  }
}

// Выполнение тестового подключения
testConnection().catch(error => {
  console.error('Не удалось установить соединение с базой данных:', error);
  process.exit(1);
});

module.exports = pool; 