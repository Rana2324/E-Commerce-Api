import express from 'express';
import authController from '../../controllers/authController.js';

const router = express.Router();

// Define auth routes - explicitly set the base paths
router.post('/register', authController.register); // POST /api/auth/register
router.post('/login', authController.login); // POST /api/auth/login

// OTP-based login routes
router.post('/login-otp-request', authController.loginOtpRequest); // POST /api/auth/login-otp-request
router.post('/login-otp-verify', authController.loginOtpVerify); // POST /api/auth/login-otp-verify

export default router;