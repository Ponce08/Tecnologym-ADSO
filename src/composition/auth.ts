import { RoleRepository } from '../infrastructure/database/typeorm/repositories/RoleRepository';
import { UserRepository } from '../infrastructure/database/typeorm/repositories/UserRepository';

import { PasswordService } from '../infrastructure/services/PasswordService';
import { TokenService } from '../infrastructure/services/TokenService';

import { AuthRoutes } from '../presentation/http/auth/AuthRoutes';
import { AuthController } from '../presentation/http/auth/AuthController';
import { createAuthMiddleware } from '../presentation/http/middlewares/createAuthMiddleware';

import { RegisterUser } from '../application/uses-cases/auth/register/RegisterUser-usecase';
import { LoginUser } from '../application/uses-cases/auth/login/LoginUser-usecase';

const userRepository = new UserRepository();
const roleRepository = new RoleRepository();

const passwordService = new PasswordService();
const tokenService = new TokenService();

export const registerUser = new RegisterUser(
  userRepository,
  roleRepository,
  passwordService,
);

export const loginUser = new LoginUser(
  userRepository,
  passwordService,
  tokenService,
);

export const authController = new AuthController(registerUser, loginUser);

export const authRoutes = AuthRoutes(authController);

export const tokenAuthMiddleware = createAuthMiddleware(tokenService);
