const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protect } = require('../middleware/auth');
const { uploadSingle } = require('../utils/s3Upload');
const { check } = require('express-validator');

// Публичные маршруты
router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);

// Защищенные маршруты (требуют аутентификации)
router.use(protect);

// Синхронизация с МойСклад
router.post('/sync', productController.syncWithMoySklad);

// Загрузка изображений для товара
router.post(
  '/:productId/images',
  uploadSingle('image', 'products'),
  [
    check('isMain').optional().isBoolean()
  ],
  productController.addProductImage
);

module.exports = router;