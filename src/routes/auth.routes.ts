import { Router } from 'express';

import { AuthController } from '../controllers/AuthController';

import { validate } from '../middlewares/validation.middleware';

import { registerSchema } from '../schemas/auth/register.schema';
import { loginSchema } from '../schemas/auth/login.schema';

/**
 * Router del módulo de autenticación.
 *
 * Aquí se definen todas las rutas relacionadas
 * con el registro e inicio de sesión.
 */
const router = Router();

const authController = new AuthController();

router.post('/register', validate(registerSchema), authController.register);

router.post('/login', validate(loginSchema), authController.login);

export default router;
