import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './ForgotPassword.module.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/forgot-password`, { email });
      setMessage('Инструкции по сбросу пароля отправлены на ваш email');
      setTimer(60); // Устанавливаем таймер на 1 минуту
    } catch (error) {
      setError(error.response?.data?.message || 'Произошла ошибка при отправке запроса');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (timer > 0) {
      setError(`Пожалуйста, подождите ${formatTime(timer)} перед повторной отправкой`);
      return;
    }

    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/forgot-password`, { email });
      setMessage('Инструкции по сбросу пароля отправлены повторно');
      setTimer(60); // Сбрасываем таймер на 1 минуту
    } catch (error) {
      setError(error.response?.data?.message || 'Произошла ошибка при отправке запроса');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>Восстановление пароля</h2>
        <p className={styles.description}>
          Введите ваш email, и мы отправим инструкции по восстановлению пароля
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          {message && <p className={styles.success}>{message}</p>}
          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.buttons}>
            <button
              type="submit"
              className={styles.button}
              disabled={isLoading || timer > 0}
            >
              {isLoading ? 'Отправка...' : 'Отправить'}
            </button>

            <button
              type="button"
              className={styles.resendButton}
              onClick={handleResend}
              disabled={isLoading || timer > 0}
            >
              {timer > 0 ? `Повторить через ${formatTime(timer)}` : 'Отправить повторно'}
            </button>
          </div>
        </form>

        <button
          className={styles.backButton}
          onClick={() => navigate('/login')}
        >
          Вернуться на страницу входа
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword; 