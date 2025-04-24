// routes/products.js
router.post('/import-from-moysklad', async (req, res) => {
    try {
      const moyskladProduct = req.body;
      
      // Преобразуем продукт из МойСклад в формат вашего магазина
      const productData = {
        name: moyskladProduct.name,
        sku: moyskladProduct.article || moyskladProduct.code,
        price: moyskladProduct.salePrices?.[0]?.value / 100 || 0,
        description: moyskladProduct.description || '',
        stock: moyskladProduct.stock || 0,
        // другие необходимые поля
      };
      
      // Сохраняем продукт в вашу БД
      const product = await Product.create(productData);
      
      res.json(product);
    } catch (error) {
      console.error('Import error:', error);
      res.status(500).json({ error: 'Import failed' });
    }
  });