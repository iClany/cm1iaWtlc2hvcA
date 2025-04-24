import React, { useState } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '../../../contexts/AuthContext';
import { orderHistoryIcon, userEditIcon } from 'components/assets/icons';
import ProfileEditButton from './components/ProfileEditButton.jsx'
import styles from './Profile.module.css';


export default function Profile() {
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const profileButtons = [
    {
      title: "Изменить персональные данные",
      alt: "Иконка изменения персональных данных",
      src: userEditIcon,
      link: "/profile/edit"
    },
    {
      title: "История заказов",
      alt: "Иконка истории заказов",
      src: orderHistoryIcon,
      link: "/profile/order-history"
    },
  ];

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

          <div className={styles.buttons}>
            {profileButtons.map((item, index) => (
            <ProfileEditButton
              key={index}
              title={item.title}
              img={item.src}
              alt={item.alt}
              link={item.link}
            />
            ))}
          </div>

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