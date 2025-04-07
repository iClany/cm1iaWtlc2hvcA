const fs = require('fs');
const path = require('path');
const { format } = require('date-fns');

const logDir = path.join(__dirname, '../../logs');

// Создаем папку для логов если ее нет
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Логирование в консоль
exports.logError = (err) => {
  console.error(`[${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}] ERROR:`, err.message);
  if (err.stack) {
    console.error(err.stack);
  }
};

// Логирование в файл
exports.logErrorToFile = (err, req) => {
  const logFile = path.join(logDir, `errors_${format(new Date(), 'yyyy-MM-dd')}.log`);
  const logMessage = `
[${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}]
Error: ${err.message}
Path: ${req.method} ${req.originalUrl}
IP: ${req.ip}
User: ${req.user ? req.user.id : 'anonymous'}
Stack: ${err.stack || 'No stack trace'}
-------------------------------------------
`;

  fs.appendFile(logFile, logMessage, (fileErr) => {
    if (fileErr) console.error('Failed to write error log:', fileErr);
  });
};