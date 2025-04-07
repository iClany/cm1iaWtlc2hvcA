const app = require('./app');
const { port } = require('./config');
const { pool } = require('./config/db');

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down...');
  pool.end(() => {
    console.log('MySQL pool closed');
    process.exit(0);
  });
});

// Start server
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Error handlers
process.on('unhandledRejection', err => {
  console.error('Unhandled Rejection! Shutting down...', err);
  server.close(() => process.exit(1));
});

process.on('uncaughtException', err => {
  console.error('Uncaught Exception! Shutting down...', err);
  server.close(() => process.exit(1));
});