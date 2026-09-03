import { Router } from 'express';

import { authRoutes } from '../../../composition/auth';
import { userRoutes } from '../../../composition/user';

const router = Router();

router.use('/auth', authRoutes);

router.use('/user', userRoutes);

export default router;
