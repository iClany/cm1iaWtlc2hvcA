import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/api';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await signup(email, password);
      if (result.error) {
        setError(result.error);
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError('Ошибка при регистрации');
    }
  };

  if (success) {
    return (
      <div>
        <h2>Регистрация успешна</h2>
        <p>Пожалуйста, проверьте вашу почту для подтверждения email.</p>
        <button onClick={() => navigate('/login')}>Перейти к входу</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Регистрация</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>Email:</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Пароль:</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <small>Пароль должен содержать минимум 8 символов, включая заглавные и строчные буквы, цифры и спецсимволы</small>
      </div>
      <button type="submit">Зарегистрироваться</button>
      <p>
        Уже есть аккаунт? <button type="button" onClick={() => navigate('/login')}>Войти</button>
      </p>
    </form>
  );
}

export default Signup;