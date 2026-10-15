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

router.use('/products', productRoutes);

export default router;
