import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../services/api';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const result = await forgotPassword(email);
      if (result.error) {
        setError(result.error);
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError('Ошибка при отправке кода восстановления');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="auth-form">
        <h2>Проверьте вашу почту</h2>
        <p>Мы отправили код восстановления на {email}</p>
        <button onClick={() => navigate('/reset-password')}>
          Перейти к восстановлению пароля
        </button>
      </div>
    );
  }

  return (
    <div className="auth-form">
      <h2>Восстановление пароля</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Отправка...' : 'Отправить код'}
        </button>
      </form>
      <div className="auth-links">
        <button onClick={() => navigate('/login')}>Вернуться ко входу</button>
      </div>
    </div>
  );
}

export default ForgotPassword;