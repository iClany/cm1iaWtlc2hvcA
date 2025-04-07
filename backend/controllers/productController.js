const Product = require('../models/Product');
const { uploadToS3 } = require('../utils/s3Upload');
const { fetchProductsFromMoySklad } = require('../utils/moySklad');
const { validationResult } = require('express-validator');

// Получение всех товаров
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.getAll();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка при получении товаров' });
  }
};

// Получение одного товара
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.getById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Товар не найден' });
    }
    
    const images = await Product.getImages(req.params.id);
    res.status(200).json({ ...product, images });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка при получении товара' });
  }
};

// Синхронизация с МойСклад
exports.syncWithMoySklad = async (req, res) => {
  try {
    const products = await fetchProductsFromMoySklad();
    // Здесь должна быть логика сохранения товаров в БД
    res.status(200).json({ message: 'Синхронизация завершена', count: products.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка при синхронизации с МойСклад' });
  }
};

// Добавление изображения к товару (для админа)
exports.addProductImage = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Необходимо загрузить изображение' });
    }

    // Загрузка в S3
    const imageUrl = await uploadToS3(req.file, 'products');
    
    // Сохранение в БД
    const isMain = req.body.isMain === 'true';
    await Product.addImage(req.params.productId, imageUrl, isMain);

    res.status(201).json({ imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка при загрузке изображения' });
  }
};