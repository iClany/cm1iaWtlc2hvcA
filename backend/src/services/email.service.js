const nodemailer = require('nodemailer');
const path = require('path');

class EmailService {
  constructor() {
    if (!process.env.SMTP_HOST || !process.env.SMTP_PORT || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      throw new Error('SMTP configuration is missing');
    }

    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendVerificationEmail(name ,email, verificationUrl) {
    if (!email || !verificationUrl) {
      throw new Error('Неверные параметры для отправки email');
    }

    console.log('Отправка письма подтверждения:', {
      to: email,
      verificationUrl
    });
    
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Подтверждение адреса эл.почты RMBike',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px;">
          <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <img src="cid:logo" alt="Логотип" style="max-width: 200px; height: auto; margin-bottom: 20px;">
              <h1 style="color: #333; margin: 0;">Подтверждение регистрации и адреса эл.почты</h1>
            </div>
            <p style="color: #666; line-height: 1.5; margin-bottom: 20px;">
              Здравствуйте ${name}, спасибо за регистрацию! Для завершения процесса, пожалуйста, подтвердите ваш адрес электронной почты.
            </p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationUrl}" 
                 style="display: inline-block; padding: 12px 24px; 
                        background-color: #007bff; color: white; 
                        text-decoration: none; border-radius: 4px; 
                        font-weight: bold;">
                Подтвердить
              </a>
            </div>
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              Если вы не регистрировались на нашем сайте, проигнорируйте это письмо.
            </p>
          </div>
          <div style="text-align: center; margin-top: 30px; color: #999; font-size: 12px;">
            <p>Это автоматическое письмо, пожалуйста, не отвечайте на него.</p>
            <p>© ${new Date().getFullYear()} Веломагазин RMBike.by. Все права защищены.</p>
          </div>
        </div>
      `,
      attachments: [{
        filename: 'logo.png',
        path: path.join(__dirname, '../public/images/logo.png'),
        cid: 'logo'
      }]
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email отправлен:', info.messageId);
      return true;
    } catch (error) {
      console.error('Ошибка отправки email:', error);
      throw new Error(`Не удалось отправить email подтверждения: ${error.message}`);
    }
  }

  async sendPasswordResetEmail(email, resetUrl) {
    if (!email || !resetUrl) {
      throw new Error('Неверные параметры для отправки email');
    }
    
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Сброс пароля',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px;">
          <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <img src="cid:logo" alt="Логотип" style="max-width: 200px; height: auto; margin-bottom: 20px;">
              <h1 style="color: #333; margin: 0;">Сброс пароля</h1>
            </div>
            <p style="color: #666; line-height: 1.5; margin-bottom: 20px;">
              Вы запросили сброс пароля. Для установки нового пароля, пожалуйста, перейдите по ссылке ниже.
            </p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" 
                 style="display: inline-block; padding: 12px 24px; 
                        background-color: #007bff; color: white; 
                        text-decoration: none; border-radius: 4px; 
                        font-weight: bold;">
                Сбросить пароль
              </a>
            </div>
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              Если вы не запрашивали сброс пароля, проигнорируйте это письмо.
            </p>
          </div>
          <div style="text-align: center; margin-top: 30px; color: #999; font-size: 12px;">
            <p>Это автоматическое письмо, пожалуйста, не отвечайте на него.</p>
            <p>© ${new Date().getFullYear()} Ваш сайт. Все права защищены.</p>
          </div>
        </div>
      `,
      attachments: [{
        filename: 'logo.png',
        path: path.join(__dirname, '../public/images/logo.png'),
        cid: 'logo'
      }]
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email отправлен:', info.messageId);
      return true;
    } catch (error) {
      console.error('Ошибка отправки email:', error);
      throw new Error(`Не удалось отправить email для сброса пароля: ${error.message}`);
    }
  }
}

module.exports = new EmailService(); 