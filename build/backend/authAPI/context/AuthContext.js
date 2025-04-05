import { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const role = localStorage.getItem('role');
    return token ? { token, email, role } : null;
  });
  const navigate = useNavigate();

  const login = (authData) => {
    localStorage.setItem('token', authData.token);
    localStorage.setItem('email', authData.email);
    localStorage.setItem('role', authData.role);
    setAuth(authData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    setAuth(null);
    navigate('/login');
  };

  const isAuthenticated = !!auth;

  return (
    <AuthContext.Provider value={{ auth, isAuthenticated, setAuth: login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}