import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import styles from './Profile.module.css';

export default function Profile() {
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      setError('');
      setMessage('');
      setLoading(true);
      await logout();
      setMessage('Вы успешно вышли из аккаунта');
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (err) {
      setError('Не удалось выйти из аккаунта');
    }
    setLoading(false);
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        <h2>Профиль</h2>
        {error && <div className={styles.errorMessage}>{error}</div>}
        {message && <div className={styles.successMessage}>{message}</div>}
        <div className={styles.profileInfo}>
          <p>
            <strong>Email:</strong> {currentUser?.email}
          </p>
          <p>
            <strong>Статус:</strong>{' '}
            {currentUser?.emailVerified ? 'Подтвержден' : 'Не подтвержден'}
          </p>
        </div>
        <div className={styles.profileActions}>
          <button
            className={styles.updateProfileBtn}
            onClick={() => navigate('/update-profile')}
            disabled={loading}
          >
            Обновить профиль
          </button>
          <button
            className={styles.logoutBtn}
            onClick={handleLogout}
            disabled={loading}
          >
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
}