import { Router } from 'express';
import { UserController } from './UserController';
import { createAuthMiddleware } from '../middlewares/createAuthMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';
import { validateMiddleware } from '../middlewares/validateMiddleware';
import { tokenService } from '../../../composition/auth';
import { createUserSchema } from '../../../application/uses-cases/auth/register/register.schema';

export function UserRoutes(userController: UserController): Router {
  const router = Router();

  router.get(
    '/',
    createAuthMiddleware(tokenService),
    roleMiddleware('Admin'),
    userController.getAll,
  );

  router.get(
    '/:id',
    createAuthMiddleware(tokenService),
    userController.getById,
  );

  router.post(
    '/',
    createAuthMiddleware(tokenService),
    roleMiddleware('Admin'),
    validateMiddleware(createUserSchema),
    userController.create,
  );

  router.put('/:id', createAuthMiddleware(tokenService), userController.update);

  router.delete(
    '/:id',
    createAuthMiddleware(tokenService),
    roleMiddleware('Admin'),
    userController.delete,
  );

  return router;
}
