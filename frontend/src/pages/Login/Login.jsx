import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    // Handle form submission
  };

  return (
    <div className={styles.container}>
      {/* ... existing form code ... */}

      <button type="submit" className={styles.button} disabled={isLoading}>
        {isLoading ? 'Вход...' : 'Войти'}
      </button>

      <div className={styles.links}>
        <Link to="/forgot-password" className={styles.link}>
          Забыли пароль?
        </Link>
        <Link to="/register" className={styles.link}>
          Регистрация
        </Link>
      </div>
    </div>
  );
};

export default Login; 