import { Router } from 'express';
import { roleMiddleware } from '../middlewares/roleMiddleware';
import { authMiddleware } from '../middlewares/authMiddleware';
import { CategoryController } from './CategoryController';
import { tokenService } from '../../composition/root';
import { validateMiddleware } from '../middlewares/validateMiddleware';
import {
  categorySchema,
  updateCategorySchema,
} from '../../infrastructure/schemas-zod/categories/category.schema';

export function CategoryRoutes(categoryController: CategoryController): Router {
  const router = Router();

  router.use(authMiddleware(tokenService));
  router.use(roleMiddleware('Admin'));

  router.get('/', categoryController.getAll);

  router.get('/:id', categoryController.getById);

  router.post(
    '/',
    validateMiddleware(categorySchema),
    categoryController.create,
  );

  router.put(
    '/:id',
    validateMiddleware(updateCategorySchema),
    categoryController.update,
  );

  router.delete('/:id', categoryController.delete);

  return router;
}
