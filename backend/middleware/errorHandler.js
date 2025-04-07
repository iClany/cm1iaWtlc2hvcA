const { NODE_ENV } = process.env;
const { logError, logErrorToFile } = require('../utils/logger');
const {
  ValidationError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  DatabaseError,
  ApiError
} = require('../utils/errors');

/**
 * Обработчик ошибок для Express.js
 */
module.exports = (err, req, res, next) => {
  // Логирование ошибки
  logError(err);
  
  // Для production окружения пишем ошибки в файл
  if (NODE_ENV === 'production') {
    logErrorToFile(err, req);
  }

  // Обработка известных ошибок
  if (err instanceof ValidationError) {
    return res.status(err.status).json({
      type: 'ValidationError',
      message: err.message,
      details: err.details,
      stack: NODE_ENV === 'development' ? err.stack : undefined
    });
  }

  if (err instanceof UnauthorizedError) {
    return res.status(err.status).json({
      type: 'UnauthorizedError',
      message: err.message,
      stack: NODE_ENV === 'development' ? err.stack : undefined
    });
  }

  if (err instanceof ForbiddenError) {
    return res.status(err.status).json({
      type: 'ForbiddenError',
      message: err.message,
      stack: NODE_ENV === 'development' ? err.stack : undefined
    });
  }

  if (err instanceof NotFoundError) {
    return res.status(err.status).json({
      type: 'NotFoundError',
      message: err.message,
      stack: NODE_ENV === 'development' ? err.stack : undefined
    });
  }

  if (err instanceof DatabaseError) {
    return res.status(err.status).json({
      type: 'DatabaseError',
      message: NODE_ENV === 'production' ? 'Database error' : err.message,
      stack: NODE_ENV === 'development' ? err.stack : undefined
    });
  }

  if (err instanceof ApiError) {
    return res.status(err.status).json({
      type: 'ApiError',
      message: err.message,
      stack: NODE_ENV === 'development' ? err.stack : undefined
    });
  }

  // Обработка JWT ошибок
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      type: 'AuthError',
      message: 'Invalid token',
      stack: NODE_ENV === 'development' ? err.stack : undefined
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      type: 'AuthError',
      message: 'Token expired',
      stack: NODE_ENV === 'development' ? err.stack : undefined
    });
  }

  // Обработка ошибок валидации express-validator
  if (err.array && err.array.length > 0) {
    return res.status(400).json({
      type: 'RequestValidationError',
      message: 'Invalid request data',
      errors: err.array(),
      stack: NODE_ENV === 'development' ? err.stack : undefined
    });
  }

  // Обработка неожиданных ошибок
  console.error('Unhandled error:', err);
  res.status(500).json({
    type: 'InternalServerError',
    message: NODE_ENV === 'production' ? 'Something went wrong' : err.message,
    stack: NODE_ENV === 'development' ? err.stack : undefined
  });
};