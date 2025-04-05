import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getProfile } from '../services/api';

function Profile() {
  const { auth, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const result = await getProfile(auth.token);
        if (result.error) {
          setError(result.error);
        } else {
          setProfile(result);
        }
      } catch (err) {
        setError('Ошибка загрузки профиля');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [auth.token]);

  if (loading) return <div>Загрузка профиля...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="profile-container">
      <h2>Ваш профиль</h2>
      <div className="profile-info">
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Роль:</strong> {profile.role}</p>
        <p><strong>Статус:</strong> {profile.verified ? 'Подтвержден' : 'Не подтвержден'}</p>
      </div>
      <button onClick={logout} className="logout-button">
        Выйти
      </button>
    </div>
  );
}

export default Profile;