import { Router } from 'express';

import { authRoutes, categoryRoutes, userRoutes } from '../../composition/root';

const router = Router();

router.use('/auth', authRoutes);

router.use('/user', userRoutes);

router.use('/categories', categoryRoutes);

export default router;
