import { Router } from 'express';
import { ProductController } from './ProductController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';
import { validateMiddleware } from '../middlewares/validateMiddleware';
import {
  productSchema,
  updateProductSchema,
} from '../../infrastructure/schemas-zod/product/product.schema';
import { tokenService } from '../../composition/root';

export const ProductRoutes = (productController: ProductController): Router => {
  const router = Router();

  router.get('/', productController.findAll);

  router.get('/:id', productController.findById);

  router.post(
    '/',
    authMiddleware(tokenService),
    roleMiddleware('Admin'),
    validateMiddleware(productSchema),
    productController.create,
  );

  router.patch(
    '/:id',
    authMiddleware(tokenService),
    roleMiddleware('Admin'),
    validateMiddleware(updateProductSchema),
    productController.update,
  );

  router.delete(
    '/:id',
    authMiddleware(tokenService),
    roleMiddleware('Admin'),
    productController.delete,
  );

  return router;
};
