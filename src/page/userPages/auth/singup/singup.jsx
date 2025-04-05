import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SingUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8697/signup", {
        email,
        password,
      });
      setMessage(response.data.message);
      setTimeout(() => navigate("/verify-email"), 2000);
    } catch (error) {
      setMessage(error.response?.data?.error || "Ошибка регистрации");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold">Регистрация</h2>
      <form onSubmit={handleRegister} className="mt-4">
        <label className="block">
          <span className="text-gray-700">Email:</span>
          <input
            type="email"
            className="mt-1 block w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="block mt-4">
          <span className="text-gray-700">Пароль:</span>
          <input
            type="password"
            className="mt-1 block w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Зарегистрироваться
        </button>
      </form>
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
  );
};

export default SingUpPage;
