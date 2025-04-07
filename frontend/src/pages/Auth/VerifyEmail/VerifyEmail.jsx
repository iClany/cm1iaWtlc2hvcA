import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Button, Box, Typography, Container, Alert, CircularProgress } from '@mui/material';
import { verifyEmail, resendVerification } from '../../api/authApi';
import toast from 'react-hot-toast';

const VerifyEmail = () => {
  const { token } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying');
  const [email, setEmail] = useState(location.state?.email || '');
  const [timer, setTimer] = useState(0);

  // Таймер для повторной отправки
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Проверка токена при загрузке компонента
  useEffect(() => {
    if (token) {
      const verify = async () => {
        try {
          await verifyEmail(token);
          setStatus('verified');
          toast.success('Email успешно подтвержден!');
          setTimeout(() => navigate('/login'), 3000);
        } catch (err) {
          setStatus('failed');
          toast.error(err.response?.data?.message || 'Ошибка при подтверждении email');
        }
      };
      verify();
    }
  }, [token, navigate]);

  const handleResend = async () => {
    if (timer > 0) return;
    
    try {
      await resendVerification(email);
      setTimer(60);
      toast.success('Письмо с подтверждением отправлено повторно');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Ошибка при повторной отправке');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Подтверждение Email
        </Typography>

        <Box sx={{ mt: 3, width: '100%', textAlign: 'center' }}>
          {status === 'verifying' && (
            <>
              <CircularProgress />
              <Typography variant="body1" sx={{ mt: 2 }}>
                Подтверждение email...
              </Typography>
            </>
          )}

          {status === 'verified' && (
            <Alert severity="success" sx={{ width: '100%', mt: 2 }}>
              Ваш email успешно подтвержден! Вы будете перенаправлены на страницу входа.
            </Alert>
          )}

          {status === 'failed' && (
            <>
              <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
                Не удалось подтвердить email. Ссылка может быть недействительной или устаревшей.
              </Alert>
              {email && (
                <Button
                  variant="contained"
                  onClick={handleResend}
                  disabled={timer > 0}
                  sx={{ mt: 2 }}
                >
                  {timer > 0 ? `Отправить повторно (${timer}с)` : 'Отправить письмо повторно'}
                </Button>
              )}
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default VerifyEmail;