import { Router } from 'express';
import { UserController } from './UserController';
import { createAuthMiddleware } from '../middlewares/createAuthMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';
import { tokenService } from '../../../composition/user';

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

  router.put('/:id', createAuthMiddleware(tokenService), userController.update);

  router.delete(
    '/:id',
    createAuthMiddleware(tokenService),
    roleMiddleware('Admin'),
    userController.delete,
  );

  return router;
}
