const express = require('express');
const axios = require('axios');
const router = express.Router();

const moyskladApi = axios.create({
  baseURL: process.env.MOYSKLAD_API_URL,
  headers: {
    'Authorization': `Bearer ${process.env.MOYSKLAD_API_KEY}`,
    'Accept-Encoding': 'gzip'
  }
});

router.get('/products', async (req, res) => {
  try {
    const { search, limit, offset } = req.query;
    let url = '/entity/product';
    
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (limit) params.append('limit', limit);
    if (offset) params.append('offset', offset);
    
    if (params.toString()) url += `?${params.toString()}`;
    
    const response = await moyskladApi.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Moysklad API error:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});


const Product = require('../models/product.model'); // Нужно будет создать модель

router.post('/import-from-moysklad', async (req, res) => {
  try {
    const moyskladProduct = req.body;
    
    const productData = {
      name: moyskladProduct.name,
      sku: moyskladProduct.article || moyskladProduct.code,
      price: moyskladProduct.salePrices?.[0]?.value / 100 || 0,
      description: moyskladProduct.description || '',
      stock: moyskladProduct.stock || 0
    };
    
    const product = await Product.create(productData);
    
    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Import error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Import failed: ' + error.message 
    });
  }
});

module.exports = router;