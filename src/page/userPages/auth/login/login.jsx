import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    setMessage("Пожалуйста, введите email и пароль");
    return;
  }

  try {
    const response = await axios.post("http://localhost:8697/auth", {
      email,
      password,
    });

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("role", response.data.role); // если нужно
    navigate("/profile");
  } catch (error) {
    setMessage(error.response?.data?.error || "Ошибка входа");
  }
};

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center">Вход</h2>
      <form onSubmit={handleLogin} className="mt-4">
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
        <label className="block mt-4 relative">
          <span className="text-gray-700">Пароль:</span>
          <input
            type={showPassword ? "text" : "password"}
            className="mt-1 block w-full p-2 border rounded pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="absolute top-9 right-2 text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </label>
        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Войти
        </button>
      </form>
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      <div className="mt-4 text-center">
        <Link to="/forgot" className="text-blue-500 hover:underline">
          Забыли пароль?
        </Link>
      </div>
      <div className="mt-4 text-center">
        <Link to="/singup" className="text-blue-500 hover:underline">
          Нет аккаунта? Зарегистрируйтесь
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;