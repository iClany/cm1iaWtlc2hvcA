import React, { useState } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '../../../contexts/AuthContext';
import styles from './Profile.module.css';

export default function Profile() {
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();
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
    <main>
      <Helmet>
        <title>Профиль | Веломагазин RMBike.by</title>
      </Helmet>

      <div className={styles.profileContainer}>
        <div className={styles.profileCard}>
          <h2>Профиль</h2>

          <Link to='/profile/edit'/>
          {error && <div className={styles.errorMessage}>{error}</div>}
          {message && <div className={styles.successMessage}>{message}</div>}
            <button
              className={styles.logoutBtn}
              onClick={handleLogout}
              disabled={loading}
            >
              Выйти
            </button>
          </div>
        </div>
      </main>
  );
}