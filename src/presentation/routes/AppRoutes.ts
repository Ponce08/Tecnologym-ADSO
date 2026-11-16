import { Router } from 'express';

import {
  authRoutes,
  categoryRoutes,
  orderRoutes,
  productRoutes,
  userRoutes,
} from '../../composition/root';

const router = Router();

router.use('/auth', authRoutes);

router.use('/user', userRoutes);

router.use('/categories', categoryRoutes);

router.use('/products', productRoutes);

router.use('/orders', orderRoutes);

export default router;
