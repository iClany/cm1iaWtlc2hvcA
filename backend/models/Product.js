const pool = require('../config/db');
const s3 = require('../config/aws');

class Product {
  // Получение всех товаров
  static async getAll() {
    const [rows] = await pool.execute('SELECT * FROM products WHERE is_active = TRUE');
    return rows;
  }

  // Получение товара по ID
  static async getById(id) {
    const [rows] = await pool.execute('SELECT * FROM products WHERE id = ? AND is_active = TRUE', [id]);
    return rows[0];
  }

  // Создание товара
  static async create({ name, description, price, category, sku }) {
    const [result] = await pool.execute(
      'INSERT INTO products (name, description, price, category, sku) VALUES (?, ?, ?, ?, ?)',
      [name, description, price, category, sku]
    );
    return result.insertId;
  }

  // Обновление товара
  static async update(id, { name, description, price, category, sku }) {
    const [result] = await pool.execute(
      'UPDATE products SET name = ?, description = ?, price = ?, category = ?, sku = ? WHERE id = ?',
      [name, description, price, category, sku, id]
    );
    return result.affectedRows > 0;
  }

  // Удаление товара (мягкое удаление)
  static async delete(id) {
    const [result] = await pool.execute(
      'UPDATE products SET is_active = FALSE WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  }

  // Добавление изображения к товару
  static async addImage(productId, imageUrl, isMain = false) {
    const [result] = await pool.execute(
      'INSERT INTO product_images (product_id, image_url, is_main) VALUES (?, ?, ?)',
      [productId, imageUrl, isMain]
    );
    return result.insertId;
  }

  // Установка главного изображения
  static async setMainImage(productId, imageId) {
    await pool.execute(
      'UPDATE product_images SET is_main = FALSE WHERE product_id = ?',
      [productId]
    );
    const [result] = await pool.execute(
      'UPDATE product_images SET is_main = TRUE WHERE id = ? AND product_id = ?',
      [imageId, productId]
    );
    return result.affectedRows > 0;
  }

  // Получение изображений товара
  static async getImages(productId) {
    const [rows] = await pool.execute(
      'SELECT * FROM product_images WHERE product_id = ? ORDER BY is_main DESC',
      [productId]
    );
    return rows;
  }
}

module.exports = Product;