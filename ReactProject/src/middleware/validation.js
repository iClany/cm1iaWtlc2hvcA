import { BadRequestError } from '../errors/customErrors.js';

export const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  
  if (error) {
    const errors = error.details.map(detail => ({
      field: detail.context.key,
      message: detail.message
    }));
    
    throw new BadRequestError('Ошибка валидации', errors);
  }
  
  next();
};