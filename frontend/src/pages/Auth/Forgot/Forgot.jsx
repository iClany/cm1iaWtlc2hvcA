import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Typography, Container, Alert } from '@mui/material';
import { forgotPassword } from '../../api/authApi';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(0);

  // Таймер для повторной отправки
  React.useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Некорректный email').required('Обязательное поле'),
    }),
    onSubmit: async (values) => {
      try {
        await forgotPassword(values.email);
        setSuccess(true);
        setTimer(60); // Устанавливаем таймер на 60 секунд
        toast.success('Письмо с инструкциями отправлено на ваш email');
      } catch (err) {
        setError(err.response?.data?.message || 'Ошибка при отправке запроса');
        toast.error(err.response?.data?.message || 'Ошибка при отправке запроса');
      }
    },
  });

  const handleResend = async () => {
    if (timer > 0) return;
    
    try {
      await forgotPassword(formik.values.email);
      setTimer(60);
      toast.success('Письмо отправлено повторно');
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка при повторной отправке');
      toast.error(err.response?.data?.message || 'Ошибка при повторной отправке');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Восстановление пароля
        </Typography>
        
        {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}
        {success && (
          <Alert severity="success" sx={{ width: '100%', mt: 2 }}>
            Письмо с инструкциями по восстановлению пароля отправлено на вашу почту
          </Alert>
        )}

        {!success ? (
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3, width: '100%' }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Введите email, указанный при регистрации, и мы отправим вам инструкции по восстановлению пароля
            </Typography>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              margin="normal"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? 'Отправка...' : 'Отправить инструкции'}
            </Button>
          </Box>
        ) : (
          <Box sx={{ mt: 3, width: '100%' }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleResend}
              disabled={timer > 0}
              sx={{ mt: 2 }}
            >
              {timer > 0 ? `Отправить повторно (${timer}с)` : 'Отправить повторно'}
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default ForgotPassword;