import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/api';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const result = await login(email, password);
      if (result.error) {
        setError(result.error);
      } else {
        setAuth({
          token: result.token,
          role: result.role,
          email: result.email
        });
        navigate('/profile');
      }
    } catch (err) {
      setError('Ошибка при входе в систему');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <h2>Вход</h2>
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
        <div className="form-group">
          <label>Пароль:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Вход...' : 'Войти'}
        </button>
      </form>
      <div className="auth-links">
        <Link to="/forgot-password">Забыли пароль?</Link>
        <span> | </span>
        <Link to="/signup">Регистрация</Link>
      </div>
    </div>
  );
}

export default Login;