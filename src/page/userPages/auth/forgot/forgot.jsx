import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPage = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleRequestReset = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8697/forgot-password", { email });
      setMessage(response.data.message);
      setStep(2);
    } catch (error) {
      setMessage(error.response?.data?.error || "Ошибка отправки кода восстановления");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8697/reset-password", { email, code, newPassword });
      setMessage(response.data.message);
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMessage(error.response?.data?.error || "Ошибка сброса пароля");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center">Восстановление пароля</h2>
      {step === 1 ? (
        <form onSubmit={handleRequestReset} className="mt-4">
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
          <button
            type="submit"
            className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Отправить код
          </button>
        </form>
      ) : (
        <form onSubmit={handleResetPassword} className="mt-4">
          <label className="block">
            <span className="text-gray-700">Код восстановления:</span>
            <input
              type="text"
              className="mt-1 block w-full p-2 border rounded"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </label>
          <label className="block mt-4">
            <span className="text-gray-700">Новый пароль:</span>
            <input
              type="password"
              className="mt-1 block w-full p-2 border rounded"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </label>
          <button
            type="submit"
            className="mt-4 w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Сбросить пароль
          </button>
        </form>
      )}
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
  );
};

export default ForgotPage;
