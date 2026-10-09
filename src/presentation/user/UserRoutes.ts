import { Router } from 'express';
import { UserController } from './UserController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';
import { validateMiddleware } from '../middlewares/validateMiddleware';
import { tokenService } from '../../composition/root';
import {
  createUserSchema,
  updateRegisterSchema,
} from '../../infrastructure/schemas-zod/auth/register.schema';

export function UserRoutes(userController: UserController): Router {
  const router = Router();

  router.get(
    '/',
    authMiddleware(tokenService),
    roleMiddleware('Admin'),
    userController.getAll,
  );

  router.get('/:id', authMiddleware(tokenService), userController.getById);

  router.post(
    '/',
    authMiddleware(tokenService),
    roleMiddleware('Admin'),
    validateMiddleware(createUserSchema),
    userController.create,
  );

  router.put(
    '/:id',
    authMiddleware(tokenService),
    validateMiddleware(updateRegisterSchema),
    userController.update,
  );

  router.delete(
    '/:id',
    authMiddleware(tokenService),
    roleMiddleware('Admin'),
    userController.delete,
  );

  return router;
}
