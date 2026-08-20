import { Router } from 'express';

import { AuthController } from './AuthController';

import { validateMiddleware } from '../middlewares/validateMiddleware';

import { registerSchema } from '../../../application/uses-cases/auth/register/register.schema';
import { loginSchema } from '../../../application/uses-cases/auth/login/login.schema';
import { tokenAuthMiddleware } from '../../../composition/auth';

export function AuthRoutes(authController: AuthController): Router {
  const router = Router();

  router.post(
    '/register',
    validateMiddleware(registerSchema),
    authController.register,
  );

  router.post(
    '/login',
    validateMiddleware(loginSchema),
    tokenAuthMiddleware,
    authController.login,
  );

  return router;
}
