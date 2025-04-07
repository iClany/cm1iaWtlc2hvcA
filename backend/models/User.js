const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

class User {
  static async create({ email, password, name, phone }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = uuidv4();
    const [result] = await pool.execute(
      'INSERT INTO users (email, password, name, phone, verification_token, is_verified) VALUES (?, ?, ?, ?, ?, ?)',
      [email, hashedPassword, name, phone, verificationToken, false]
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await pool.execute('SELECT id, email, name, phone, is_verified, role FROM users WHERE id = ?', [id]);
    return rows[0];
  }

  static async update(id, { name, phone }) {
    const [result] = await pool.execute(
      'UPDATE users SET name = ?, phone = ? WHERE id = ?',
      [name, phone, id]
    );
    return result.affectedRows > 0;
  }

  static async verifyEmail(token) {
    const [result] = await pool.execute(
      'UPDATE users SET is_verified = TRUE, verification_token = NULL WHERE verification_token = ?',
      [token]
    );
    return result.affectedRows > 0;
  }

  static async updatePassword(id, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const [result] = await pool.execute(
      'UPDATE users SET password = ? WHERE id = ?',
      [hashedPassword, id]
    );
    return result.affectedRows > 0;
  }

  static async createPasswordResetToken(email) {
    const resetToken = uuidv4();
    const expiresAt = new Date(Date.now() + 3600000); // 1 час
    const [result] = await pool.execute(
      'UPDATE users SET reset_token = ?, reset_token_expires = ? WHERE email = ?',
      [resetToken, expiresAt, email]
    );
    return result.affectedRows > 0 ? resetToken : null;
  }

  static async resetPassword(token, newPassword) {
    const user = await this.findByResetToken(token);
    if (!user) return false;

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const [result] = await pool.execute(
      'UPDATE users SET password = ?, reset_token = NULL, reset_token_expires = NULL WHERE reset_token = ?',
      [hashedPassword, token]
    );
    return result.affectedRows > 0;
  }

  static async findByResetToken(token) {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE reset_token = ? AND reset_token_expires > NOW()',
      [token]
    );
    return rows[0];
  }
}

module.exports = User;