import { DeleteUser } from '../application/uses-cases/user/DeleteUser';
import { GetUserById } from '../application/uses-cases/user/GetUserById';
import { GetUsers } from '../application/uses-cases/user/GetUsers';
import { UpdateUser } from '../application/uses-cases/user/UpdateUser';
import { UserRepository } from '../infrastructure/database/typeorm/repositories/UserRepository';
import { TokenService } from '../infrastructure/services/TokenService';
import { UserController } from '../presentation/http/user/UserController';
import { UserRoutes } from '../presentation/http/user/UserRoutes';

export const tokenService = new TokenService();

const userRepository = new UserRepository();

const getUsers = new GetUsers(userRepository);
const getUserById = new GetUserById(userRepository);
const updateUser = new UpdateUser(userRepository);
const deleteUser = new DeleteUser(userRepository);

const userController = new UserController(
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
);

export const userRoutes = UserRoutes(userController);
