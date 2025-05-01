import express from 'express';
import authRoutes from './modules/authRoutes.js';

const router = express.Router();

// Mount auth routes directly
router.use('/auth', authRoutes);

export default router;