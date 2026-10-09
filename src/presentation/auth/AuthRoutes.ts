import { Router } from 'express';

import { AuthController } from './AuthController';

import { validateMiddleware } from '../middlewares/validateMiddleware';

import { registerSchema } from '../../infrastructure/schemas-zod/auth/register.schema';
import { loginSchema } from '../../infrastructure/schemas-zod/auth/login.schema';

export function AuthRoutes(authController: AuthController): Router {
  const router = Router();

  router.post(
    '/register',
    validateMiddleware(registerSchema),
    authController.register,
  );

  router.post('/login', validateMiddleware(loginSchema), authController.login);

  return router;
}
