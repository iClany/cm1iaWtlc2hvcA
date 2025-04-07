const { body, query } = require('express-validator');

module.exports = {
  updateUserValidator: [
    body('name').notEmpty().withMessage('Имя обязательно'),
    body('phone')
      .optional()
      .isMobilePhone()
      .withMessage('Некорректный номер телефона')
  ],

  changePasswordValidator: [
    body('currentPassword').notEmpty().withMessage('Текущий пароль обязателен'),
    body('newPassword')
      .isLength({ min: 8 })
      .withMessage('Пароль должен быть минимум 8 символов')
  ],

  checkEmailValidator: [
    query('email')
      .isEmail()
      .withMessage('Некорректный email')
      .notEmpty()
      .withMessage('Email обязателен')
  ]
};