import React, { useState } from "react";
import axios from "axios";

const AddPictures = () => {
    const [file, setFile] = useState(null);
    const [productId, setProductId] = useState("");
    const [preview, setPreview] = useState(null);
  
    const handleUpload = async () => {
      if (!file || !productId) return alert("Выберите файл и введите ID товара!");
  
      const formData = new FormData();
      formData.append("image", file);
  
      try {
        const { data } = await axios.post(`http://localhost:5001/api/upload/${productId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
  
        alert("Изображение загружено!");
        setPreview(`http://localhost:5001${data.imageUrl}`); // Отображаем загруженное изображение
      } catch (error) {
        console.error("Ошибка загрузки", error);
        alert("Ошибка загрузки изображения");
      }
    };
  
    return (
      <div>
        <h2>Загрузка изображения</h2>
        <input
          type="text"
          placeholder="ID товара"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={handleUpload}>Загрузить</button>
  
        {preview && (
          <div>
            <h3>Загруженное изображение:</h3>
            <img src={preview} alt="Предпросмотр" style={{ maxWidth: "300px", marginTop: "10px" }} />
          </div>
        )}
      </div>
    );
  };

export default AddPictures;