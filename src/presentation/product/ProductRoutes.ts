import { Router } from 'express';
import { ProductController } from './ProductController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';
import { validateMiddleware } from '../middlewares/validateMiddleware';
import {
  productSchema,
  updateProductSchema,
} from '../../infrastructure/schemas-zod/product/product.schema';

export const ProductRoutes = (productController: ProductController): Router => {
  const router = Router();

  router.get('/', productController.findAll.bind(productController));

  router.get('/:id', productController.findById.bind(productController));

  router.post(
    '/',
    authMiddleware,
    roleMiddleware('admin'),
    validateMiddleware(productSchema),
    productController.create.bind(productController),
  );

  router.patch(
    '/:id',
    authMiddleware,
    roleMiddleware('admin'),
    validateMiddleware(updateProductSchema),
    productController.update.bind(productController),
  );

  router.delete(
    '/:id',
    authMiddleware,
    roleMiddleware('admin'),
    productController.delete.bind(productController),
  );

  return router;
};
