const emailService = require('../services/email.service');

class TestController {
  async sendCustomEmail(req, res) {
    try {
      const { email, subject, message } = req.body;

      if (!email || !subject || !message) {
        return res.status(400).json({ message: 'Все поля обязательны для заполнения' });
      }

      await emailService.sendEmail({
        to: email,
        subject,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>${subject}</h2>
            <p>${message}</p>
            <p style="color: #666; font-size: 12px; margin-top: 20px;">
              Это тестовое сообщение отправлено через тестовую страницу.
            </p>
          </div>
        `
      });

      res.json({ message: 'Письмо успешно отправлено' });
    } catch (error) {
      console.error('Ошибка при отправке тестового письма:', error);
      res.status(500).json({ message: 'Ошибка при отправке письма' });
    }
  }
}

module.exports = new TestController(); 