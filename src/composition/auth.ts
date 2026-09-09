import { RoleRepository } from '../infrastructure/database/typeorm/repositories/RoleRepository';
import { UserRepository } from '../infrastructure/database/typeorm/repositories/UserRepository';

import { PasswordService } from '../infrastructure/services/PasswordService';
import { TokenService } from '../infrastructure/services/TokenService';

import { AuthRoutes } from '../presentation/http/auth/AuthRoutes';
import { AuthController } from '../presentation/http/auth/AuthController';
import { createAuthMiddleware } from '../presentation/http/middlewares/createAuthMiddleware';

import { RegisterUser } from '../application/uses-cases/auth/register/RegisterUser-usecase';
import { LoginUser } from '../application/uses-cases/auth/login/LoginUser-usecase';

import { GetUsers } from '../application/uses-cases/user/GetUsers';
import { GetUserById } from '../application/uses-cases/user/GetUserById';
import { UpdateUser } from '../application/uses-cases/user/UpdateUser';
import { DeleteUser } from '../application/uses-cases/user/DeleteUser';
import { CreateUser } from '../application/uses-cases/admin/CreateUser';
import { UserController } from '../presentation/http/user/UserController';
import { UserRoutes } from '../presentation/http/user/UserRoutes';

// Auth
const userRepository = new UserRepository();
const roleRepository = new RoleRepository();

const passwordService = new PasswordService();
export const tokenService = new TokenService();

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

// User
const getUsers = new GetUsers(userRepository);
const getUserById = new GetUserById(userRepository);
const updateUser = new UpdateUser(userRepository);
const deleteUser = new DeleteUser(userRepository);
const createUser = new CreateUser(
  userRepository,
  roleRepository,
  passwordService,
);

const userController = new UserController(
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
);

export const userRoutes = UserRoutes(userController);
