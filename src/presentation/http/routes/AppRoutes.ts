import { Router } from 'express';

import { authRoutes } from '../../../composition/auth';

const router = Router();

router.use('/auth', authRoutes);

export default router;
