export class CustomAPIError extends Error {
    constructor(message) {
      super(message);
      this.name = this.constructor.name;
    }
  }
  
  export class BadRequestError extends CustomAPIError {
    constructor(message, errors = []) {
      super(message);
      this.statusCode = 400;
      this.errors = errors;
    }
  }
  
  export class UnauthorizedError extends CustomAPIError {
    constructor(message = 'Не авторизован') {
      super(message);
      this.statusCode = 401;
    }
  }
  
  export class ForbiddenError extends CustomAPIError {
    constructor(message = 'Доступ запрещен') {
      super(message);
      this.statusCode = 403;
    }
  }