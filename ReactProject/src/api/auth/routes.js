import express from 'express';
import {
  signup,
  verifyEmail,
  login,
  forgotPassword,
  resetPassword,
  getProfile,
  resendVerification,
  updateProfile,
  changePassword
} from './controllers.js';
import { authenticateToken } from '../../utils/helpers.js';
import { validate } from '../../middleware/validation.js';
import {
  signupSchema,
  loginSchema,
  verifyEmailSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
  updateProfileSchema
} from './validationSchemas.js';

const router = express.Router();

// Публичные маршруты (не требуют аутентификации)
router.post('/signup', validate(signupSchema), signup);
router.post('/verify-email', validate(verifyEmailSchema), verifyEmail);
router.post('/resend-verification', validate(forgotPasswordSchema), resendVerification);
router.post('/login', validate(loginSchema), login);
router.post('/forgot-password', validate(forgotPasswordSchema), forgotPassword);
router.post('/reset-password', validate(resetPasswordSchema), resetPassword);

// Защищенные маршруты (требуют JWT аутентификации)
router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, validate(updateProfileSchema), updateProfile);
router.put('/change-password', authenticateToken, validate(changePasswordSchema), changePassword);

// Админ-маршруты
router.get('/admin/users', authenticateToken, adminCheck, getUsersList);
router.put('/admin/users/:id', authenticateToken, adminCheck, adminUpdateUser);

export default router;