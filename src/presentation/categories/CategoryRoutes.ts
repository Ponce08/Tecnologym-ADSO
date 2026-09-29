import { Router } from 'express';
import { roleMiddleware } from '../middlewares/roleMiddleware';
import { authMiddleware } from '../middlewares/authMiddleware';
import { CategoryController } from './CategoryController';
import { tokenService } from '../../composition/root';

export function CategoryRoutes(categoryController: CategoryController): Router {
  const router = Router();

  router.get('/', categoryController.getAll);

  router.get('/:id', categoryController.getById);

  router.post(
    '/',
    authMiddleware(tokenService),
    roleMiddleware('Admin'),
    categoryController.create,
  );

  router.put(
    '/:id',
    authMiddleware(tokenService),
    roleMiddleware('Admin'),
    categoryController.update,
  );

  router.delete(
    '/:id',
    authMiddleware(tokenService),
    roleMiddleware('Admin'),
    categoryController.delete,
  );

  return router;
}
