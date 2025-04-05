import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function VerifyEmailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Проверка...");
  const [success, setSuccess] = useState(false);

  // Вытаскиваем query-параметры
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const email = query.get("email");
    const code = query.get("code");

    if (!email || !code) {
      setStatus("Неверная ссылка подтверждения");
      return;
    }

    // Отправляем запрос на бэкенд
    axios
      .post("http://localhost:8697/verify-email", { email, code })
      .then(() => {
        setStatus("Email подтверждён");
        setSuccess(true);
        setTimeout(() => navigate("/login"), 2000);
      })
      .catch((err) => {
        setStatus(err.response?.data?.error || "Ошибка подтверждения");
      });
  }, [location.search, navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">Подтверждение Email</h2>
        <p className={`text-lg ${success ? "text-green-600" : "text-red-600"}`}>
          {status}
        </p>
      </div>
    </div>
  );
}