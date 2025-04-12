import React, { useState } from 'react';
import axios from 'axios';
import styles from './TestEmail.module.css';

export default function TestEmail() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleSendEmail = async (type) => {
    try {
      setLoading(true);
      setStatus('');

      let data = {};
      switch(type) {
        case 'verification':
          data = { email };
          await axios.post(`${process.env.REACT_APP_API_URL}/auth/send-verification`, data);
          setStatus('Письмо с подтверждением отправлено');
          break;
        case 'reset':
          data = { email };
          await axios.post(`${process.env.REACT_APP_API_URL}/auth/forgot-password`, data);
          setStatus('Письмо с восстановлением пароля отправлено');
          break;
        case 'custom':
          data = { email, subject, message };
          await axios.post(`${process.env.REACT_APP_API_URL}/test/send-email`, data);
          setStatus('Пользовательское письмо отправлено');
          break;
      }
    } catch (error) {
      setStatus(`Ошибка: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Тестовая страница отправки email</h1>
      
      <div className={styles.formGroup}>
        <label>Email получателя:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Введите email"
        />
      </div>

      <div className={styles.buttons}>
        <button
          onClick={() => handleSendEmail('verification')}
          disabled={loading || !email}
        >
          Отправить письмо подтверждения
        </button>

        <button
          onClick={() => handleSendEmail('reset')}
          disabled={loading || !email}
        >
          Отправить письмо сброса пароля
        </button>
      </div>

      <div className={styles.customEmail}>
        <h2>Отправить пользовательское письмо</h2>
        <div className={styles.formGroup}>
          <label>Тема письма:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Введите тему письма"
          />
        </div>
        <div className={styles.formGroup}>
          <label>Текст письма:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Введите текст письма"
          />
        </div>
        <button
          onClick={() => handleSendEmail('custom')}
          disabled={loading || !email || !subject || !message}
        >
          Отправить пользовательское письмо
        </button>
      </div>

      {status && (
        <div className={styles.status}>
          {status}
        </div>
      )}
    </div>
  );
} 