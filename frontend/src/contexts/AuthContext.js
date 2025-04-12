import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth должен использоваться внутри AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setCurrentUser(decoded);
      } catch (error) {
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  async function login(email, password) {
    try {
      const response = await axios.post('http://localhost:8893/api/auth/login', {
        email,
        password
      });
      const { token } = response.data;
      localStorage.setItem('token', token);
      const decoded = jwtDecode(token);
      setCurrentUser(decoded);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async function register(name, email, password) {
    try {
      const response = await axios.post('http://localhost:8893/api/auth/register', {
        name,
        email,
        password
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async function logout() {
    localStorage.removeItem('token');
    setCurrentUser(null);
  }

  async function sendEmailVerification() {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:8893/api/auth/send-verification-email',
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  const value = {
    currentUser,
    login,
    register,
    logout,
    sendEmailVerification
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}