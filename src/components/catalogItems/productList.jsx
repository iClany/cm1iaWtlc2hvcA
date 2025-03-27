import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5001/api/products";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(API_URL);
        setProducts(response.data); // Теперь данные правильно отображаются
      } catch (err) {
        setError("Ошибка загрузки товаров");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
      {products.map((product) => (
        <div key={product.id} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "8px" }}>
          <h3>{product.name}</h3>
          <p>Цена: {product.salePrices?.[0]?.value / 100 || "Не указана"} BYN</p>
          <p>Наличие: {product.quantity || "Нет данных"}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;