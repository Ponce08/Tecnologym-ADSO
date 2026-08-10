import { Router } from 'express';

import { AuthController } from '../controllers/AuthController';

import { validateMiddleware } from '../middlewares/validation.middleware';

import { registerSchema } from '../schemas/auth/register.schema';
import { loginSchema } from '../schemas/auth/login.schema';

import { authMiddleware } from '../middlewares/authMiddleware';

/**
 * Router del módulo de autenticación.
 *
 * Aquí se definen todas las rutas relacionadas
 * con el registro e inicio de sesión.
 */
const router = Router();

const authController = new AuthController();

router.post(
  '/register',
  validateMiddleware(registerSchema),
  authController.register,
);

router.post('/login', validateMiddleware(loginSchema), authController.login);

router.get('/me', authMiddleware, authController.me);

export default router;
