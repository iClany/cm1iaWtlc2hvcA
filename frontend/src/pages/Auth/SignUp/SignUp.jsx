import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { TextField, Button, Box, Typography, Container, Alert } from '@mui/material';
import { registerUser } from '../../api/authApi';
import toast from 'react-hot-toast';

const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Обязательное поле'),
      email: Yup.string().email('Некорректный email').required('Обязательное поле'),
      phone: Yup.string().matches(/^\+?[0-9]{10,15}$/, 'Некорректный номер телефона'),
      password: Yup.string()
        .min(8, 'Пароль должен содержать минимум 8 символов')
        .required('Обязательное поле'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
        .required('Обязательное поле'),
    }),
    onSubmit: async (values) => {
      try {
        await registerUser({
          name: values.name,
          email: values.email,
          phone: values.phone,
          password: values.password,
        });
        toast.success('Регистрация успешна! Проверьте email для подтверждения');
        navigate('/verify-email', { state: { email: values.email } });
      } catch (err) {
        setError(err.response?.data?.message || 'Ошибка при регистрации');
        toast.error(err.response?.data?.message || 'Ошибка при регистрации');
      }
    },
  });

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Регистрация
        </Typography>
        {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3, width: '100%' }}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Имя"
            margin="normal"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
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
          <TextField
            fullWidth
            id="phone"
            name="phone"
            label="Телефон"
            margin="normal"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Пароль"
            type="password"
            margin="normal"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            label="Подтвердите пароль"
            type="password"
            margin="normal"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
          </Button>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Typography variant="body2" color="primary">
                Уже есть аккаунт? Войти
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;