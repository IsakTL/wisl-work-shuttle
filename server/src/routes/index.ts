import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';
import map from './map-routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/api', authenticateToken, apiRoutes);
router.use('/map', map);

export default router;
