import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Регистрация пользователя
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};

// Вход пользователя
export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  return response.data;
};

// Подтверждение email
export const verifyEmail = async (token) => {
  const response = await axios.get(`${API_URL}/auth/verify-email/${token}`);
  return response.data;
};

// Запрос на сброс пароля
export const forgotPassword = async (email) => {
  const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
  return response.data;
};

// Сброс пароля
export const resetPassword = async (token, newPassword) => {
  const response = await axios.post(`${API_URL}/auth/reset-password/${token}`, { password: newPassword });
  return response.data;
};

// Повторная отправка подтверждения email
export const resendVerification = async (email) => {
  const response = await axios.post(`${API_URL}/auth/resend-verification`, { email });
  return response.data;
};

// Получение данных текущего пользователя
export const getMe = async (token) => {
  const response = await axios.get(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};