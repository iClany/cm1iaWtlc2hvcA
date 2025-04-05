import express from 'express';
import {
  signup,
  verifyEmail,
  login,
  forgotPassword,
  resetPassword,
  getProfile
} from './controllers.js';
import { authenticateToken } from '../../utils/helpers.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/verify-email', verifyEmail);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/profile', authenticateToken, getProfile);

export default router;