import { Router } from 'express';

import { authRoutes } from '../../composition/root';
import { userRoutes } from '../../composition/root';

const router = Router();

router.use('/auth', authRoutes);

router.use('/user', userRoutes);

export default router;
