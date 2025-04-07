const axios = require('axios');
require('dotenv').config();

// Получение товаров из МойСклад
exports.fetchProductsFromMoySklad = async () => {
  try {
    const response = await axios.get('https://api.moysklad.ru/api/remap/1.2/entity/product', {
      headers: {
        'Authorization': `Bearer ${process.env.MOY_SKLAD_TOKEN}`,
        'Accept-Encoding': 'gzip'
      }
    });

    return response.data.rows.map(product => ({
      name: product.name,
      description: product.description || '',
      price: product.minPrice?.value || 0,
      sku: product.code,
      externalId: product.id
    }));
  } catch (error) {
    console.error('Ошибка при получении товаров из МойСклад:', error.response?.data || error.message);
    throw new Error('Не удалось получить товары из МойСклад');
  }
};

// Синхронизация остатков
exports.syncStock = async (productExternalIds) => {
  try {
    const response = await axios.get(
      'https://api.moysklad.ru/api/remap/1.2/report/stock/bystore?' + 
      new URLSearchParams({ stockstore: process.env.MOY_SKLAD_STORE_ID }),
      {
        headers: {
          'Authorization': `Bearer ${process.env.MOY_SKLAD_TOKEN}`,
          'Accept-Encoding': 'gzip'
        }
      }
    );

    return response.data.rows
      .filter(item => productExternalIds.includes(item.assortmentId))
      .map(item => ({
        externalId: item.assortmentId,
        stock: item.quantity
      }));
  } catch (error) {
    console.error('Ошибка при синхронизации остатков:', error.response?.data || error.message);
    throw new Error('Не удалось синхронизировать остатки');
  }
};