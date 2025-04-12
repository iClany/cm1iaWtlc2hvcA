const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

class AdminController {
  async checkAdmin(req, res) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'Токен не предоставлен' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);

      if (!user || !user.isAdmin) {
        return res.status(403).json({ message: 'Доступ запрещен' });
      }

      res.json({ isAdmin: true });
    } catch (error) {
      console.error('Ошибка проверки прав администратора:', error);
      res.status(401).json({ message: 'Недействительный токен' });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.getAll();
      res.json(users);
    } catch (error) {
      console.error('Ошибка получения списка пользователей:', error);
      res.status(500).json({ message: 'Ошибка при получении списка пользователей' });
    }
  }

  async updateUserStatus(req, res) {
    try {
      const { userId } = req.params;
      const { isActive } = req.body;

      const result = await User.updateStatus(userId, isActive);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Пользователь не найден' });
      }

      res.json({ message: 'Статус пользователя успешно обновлен' });
    } catch (error) {
      console.error('Ошибка обновления статуса пользователя:', error);
      res.status(500).json({ message: 'Ошибка при обновлении статуса пользователя' });
    }
  }
}

module.exports = new AdminController(); 