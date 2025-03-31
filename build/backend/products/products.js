require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 5001;

const API_URL = "https://api.moysklad.ru/api/remap/1.2/entity/product";
const API_KEY = process.env.MoySklad_API_KEY;

app.use(cors());

app.get("/api/products", async (req, res) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${API_KEY}`
      },
    });
    res.json(response.data.rows);
  } catch (error) {
    console.error("Ошибка при получении товаров:", error.response?.data || error.message);
    res.status(500).json({ message: "Ошибка загрузки товаров", error: error.message });
  }
});

app.listen(PORT, () => console.log(`Сервер запущен на http://localhost:${PORT}`));