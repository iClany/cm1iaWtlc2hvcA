import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './ProductList.module.css';
import LoadingSpinner from '../../ui/LoadingSpinner/LoadingSpinner.js';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api/products';
const NO_IMAGE = '/img/thumbnail_images/no_image.jpg';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(API_URL);
        setProducts(data);
      } catch (err) {
        console.error('Ошибка загрузки товаров:', err);
        setError('Не удалось загрузить товары. Пожалуйста, попробуйте позже.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const formatPrice = (price) => {
    return price ? `${(price / 100).toFixed(2)} BYN` : 'Цена не указана';
  };

  const getStockStatus = (quantity) => {
    if (quantity === 0) return 'Нет в наличии';
    if (!quantity) return 'Нет данных';
    return `В наличии: ${quantity} шт.`;
  };

  if (loading) return <LoadingSpinner fullPage />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className={styles.productGrid}>
      {products.map((product) => (
        <article key={product.id} className={styles.productCard}>
          <div className={styles.imageContainer}>
            <img
              src={product.thumbnail || NO_IMAGE}
              alt={product.name || 'Изображение товара'}
              className={styles.productImage}
              loading="lazy"
              onError={(e) => {
                e.target.src = NO_IMAGE;
              }}
            />
          </div>
          <div className={styles.productInfo}>
            <h3 className={styles.productTitle}>{product.name}</h3>
            <p className={styles.productPrice}>
              {formatPrice(product.salePrices?.[0]?.value)}
            </p>
            <p className={styles.productStock}>
              {getStockStatus(product.quantity)}
            </p>
            <button className={styles.addToCartButton}>В корзину</button>
          </div>
        </article>
      ))}
    </div>
  );
};

export default ProductList;