class AppError extends Error {
    constructor(message, status = 500) {
      super(message);
      this.name = this.constructor.name;
      this.status = status;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  class ValidationError extends AppError {
    constructor(message = 'Validation failed', details = []) {
      super(message, 400);
      this.details = details;
    }
  }
  
  class UnauthorizedError extends AppError {
    constructor(message = 'Unauthorized') {
      super(message, 401);
    }
  }
  
  class ForbiddenError extends AppError {
    constructor(message = 'Forbidden') {
      super(message, 403);
    }
  }
  
  class NotFoundError extends AppError {
    constructor(message = 'Resource not found') {
      super(message, 404);
    }
  }
  
  class ConflictError extends AppError {
    constructor(message = 'Conflict occurred') {
      super(message, 409);
    }
  }
  
  class DatabaseError extends AppError {
    constructor(message = 'Database error') {
      super(message, 500);
    }
  }
  
  class ApiError extends AppError {
    constructor(message = 'API error', status = 500) {
      super(message, status);
    }
  }
  
  module.exports = {
    AppError,
    ValidationError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    ConflictError,
    DatabaseError,
    ApiError
  };