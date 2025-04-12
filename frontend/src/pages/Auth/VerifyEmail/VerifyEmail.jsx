import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import styles from './VerifyEmail.module.css';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const token = searchParams.get('token');
        console.log('Получен токен:', token);
        
        if (!token) {
          setVerificationStatus('error');
          setErrorMessage('Токен подтверждения не найден');
          return;
        }

        // Проверяем наличие переменных окружения
        console.log('Все переменные окружения:', process.env);
        console.log('REACT_APP_API_URL:', process.env.REACT_APP_API_URL);
        
        if (!process.env.REACT_APP_API_URL) {
          console.error('REACT_APP_API_URL не определен в .env файле');
          setVerificationStatus('error');
          setErrorMessage('Ошибка конфигурации приложения');
          return;
        }

        const apiUrl = process.env.REACT_APP_API_URL;
        console.log('API URL из переменных окружения:', apiUrl);
        const verifyUrl = `${apiUrl}/auth/verify-email?token=${token}`;
        console.log('Отправка запроса на:', verifyUrl);

        const response = await axios.get(verifyUrl);
        console.log('Ответ сервера:', response.data);

        if (response.status === 200) {
          setVerificationStatus('success');
          // Перенаправляем на страницу входа через 3 секунды
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        }
      } catch (error) {
        console.error('Ошибка верификации:', error);
        setVerificationStatus('error');
        
        if (error.response) {
          // Обработка ошибок от сервера
          switch (error.response.status) {
            case 400:
              setErrorMessage(error.response.data.message || 'Недействительный токен');
              break;
            case 404:
              setErrorMessage('Пользователь не найден');
              break;
            case 500:
              setErrorMessage('Ошибка сервера при верификации email');
              break;
            default:
              setErrorMessage('Произошла ошибка при верификации email');
          }
        } else {
          setErrorMessage('Не удалось подключиться к серверу');
        }
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {verificationStatus === 'loading' && (
          <div className={styles.status}>
            <h2>Подтверждение email</h2>
            <p>Пожалуйста, подождите...</p>
          </div>
        )}

        {verificationStatus === 'success' && (
          <div className={styles.status}>
            <h2>Email успешно подтвержден!</h2>
            <p>Вы будете перенаправлены на страницу входа...</p>
          </div>
        )}

        {verificationStatus === 'error' && (
          <div className={styles.status}>
            <h2>Ошибка подтверждения</h2>
            <p>{errorMessage}</p>
            <button 
              className={styles.button}
              onClick={() => navigate('/login')}
            >
              Вернуться на страницу входа
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;