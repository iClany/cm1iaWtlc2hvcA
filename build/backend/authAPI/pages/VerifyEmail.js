import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyEmail, resendCode } from '../services/api';

function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const [email, setEmail] = useState(queryParams.get('email') || '');
  const [code, setCode] = useState(queryParams.get('code') || '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const result = await verifyEmail(email, code);
      if (result.error) {
        setError(result.error);
      } else {
        setSuccess('Email успешно подтвержден! Теперь вы можете войти.');
        setTimeout(() => navigate('/login'), 3000);
      }
    } catch (err) {
      setError('Ошибка при подтверждении email');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setLoading(true);
    setError('');
    
    try {
      const result = await resendCode(email);
      if (result.error) {
        setError(result.error);
      } else {
        setSuccess('Новый код подтверждения отправлен на ваш email');
      }
    } catch (err) {
      setError('Ошибка при отправке кода');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <h2>Подтверждение Email</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      
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
        <div className="form-group">
          <label>Код подтверждения:</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Проверка...' : 'Подтвердить'}
        </button>
      </form>
      
      <div className="resend-code">
        <p>Не получили код?</p>
        <button 
          onClick={handleResendCode} 
          disabled={loading || !email}
        >
          Отправить код повторно
        </button>
      </div>
    </div>
  );
}

export default VerifyEmail;