import { Router } from 'express';

import {
  authRoutes,
  categoryRoutes,
  productRoutes,
  userRoutes,
} from '../../composition/root';

const router = Router();

router.use('/auth', authRoutes);

router.use('/user', userRoutes);

router.use('/categories', categoryRoutes);

router.use('/api/products', productRoutes);

export default router;
