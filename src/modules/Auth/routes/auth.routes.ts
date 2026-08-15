import { Router } from 'express';

import { AuthController } from '../controllers/AuthController';

import { validateMiddleware } from '../middlewares/validation-zod.middleware';

import { registerSchema } from '../schemas/register.schema';
import { loginSchema } from '../schemas/login.schema';

/**
 * Router del módulo de autenticación.
 *
 * Aquí se definen todas las rutas relacionadas
 * con el registro e inicio de sesión.
 */
const authRouter = Router();

const authController = new AuthController();

authRouter.post(
  '/register',
  validateMiddleware(registerSchema),
  authController.register,
);

authRouter.post(
  '/login',
  validateMiddleware(loginSchema),
  authController.login,
);

export default authRouter;
