const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Отправка email для подтверждения
exports.sendVerificationEmail = async (email, token) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${token}`;
  
  await transporter.sendMail({
    from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM_ADDRESS}>`,
    to: email,
    subject: 'Подтверждение email',
    html: `
      <h1>Подтвердите ваш email</h1>
      <p>Пожалуйста, перейдите по ссылке ниже для подтверждения вашего email:</p>
      <a href="${verificationUrl}">${verificationUrl}</a>
      <p>Если вы не регистрировались на нашем сайте, проигнорируйте это письмо.</p>
    `,
  });
};

// Отправка email для сброса пароля
exports.sendPasswordResetEmail = async (email, token) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;
  
  await transporter.sendMail({
    from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM_ADDRESS}>`,
    to: email,
    subject: 'Сброс пароля',
    html: `
      <h1>Сброс пароля</h1>
      <p>Вы запросили сброс пароля. Перейдите по ссылке ниже для установки нового пароля:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>Ссылка действительна в течение 1 часа.</p>
      <p>Если вы не запрашивали сброс пароля, проигнорируйте это письмо.</p>
    `,
  });
};