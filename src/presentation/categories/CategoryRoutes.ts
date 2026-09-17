import { Router } from 'express';
import { roleMiddleware } from '../middlewares/roleMiddleware';
import { authMiddleware } from '../middlewares/authMiddleware';
import { CategoryController } from './CategoryController';

export function CategoryRoutes(categoryController: CategoryController): Router {
  const router = Router();

  router.get('/', categoryController.getAll);

  router.get('/:id', categoryController.getById);

  router.post(
    '/',
    authMiddleware,
    roleMiddleware('admin'),
    categoryController.create,
  );

  router.put(
    '/:id',
    authMiddleware,
    roleMiddleware('admin'),
    categoryController.update,
  );

  router.delete(
    '/:id',
    authMiddleware,
    roleMiddleware('admin'),
    categoryController.delete,
  );

  return router;
}
