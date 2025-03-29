import React, { useEffect, useState } from "react";
import axios from "axios";

// import productList from './productList.module.css'

const API_URL = "http://localhost:5001/api/products";
const NO_IMG = "/img/thumbnail_images/no_image.jpg";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(API_URL);
        setProducts(response.data);
      } catch (err) {
        setError("Ошибка загрузки товаров");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return console.log;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
      {products.map((product) => (
        <div key={product.id} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "8px" }}>
          <img src={product.thumbnail || NO_IMG } alt="Главное изображение товара" style={{maxWidth: "300px"}}></img>
          <h3>{product.name}</h3>
          <p>Цена: {product.salePrices?.[0]?.value / 100 || "Не указана"} BYN</p>
          <p>Остаток: {product.quantity || "Нет данных"}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;