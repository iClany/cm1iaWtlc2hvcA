require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs-extra");
const path = require("path");
const axios = require("axios");

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.static("public"));

const API_URL = "https://api.moysklad.ru/api/remap/1.2/entity/product";
const API_KEY = process.env.MoySklad_API_KEY;

// 📂 Настройки Multer (сохранение в папку public/images)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "public/images");
    fs.ensureDirSync(uploadPath); // Создаёт папку, если её нет
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

app.get("/api/products", async (req, res) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });
    res.json(response.data.rows);
  } catch (error) {
    console.error("Ошибка при получении товаров:", error.response?.data || error.message);
    res.status(500).json({ message: "Ошибка загрузки товаров", error: error.message });
  }
});

// 📌 Обработчик загрузки изображения
app.post("/api/upload", upload.single("image"), (req, res) => {
  const fileUrl = `/images/${req.file.filename}`;
  res.json({
    message: "Изображение успешно загружено",
    imageUrl: fileUrl, // Отдаём путь к файлу
  });
});

app.listen(PORT, () => console.log(`Сервер запущен на http://localhost:${PORT}`));