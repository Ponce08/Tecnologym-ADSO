/**
 * Composition root: aquí se instancian y conectan (wiring) las dependencias
 * concretas de cada módulo (repositorios, servicios, casos de uso,
 * controladores y rutas), siguiendo el patrón de Inyección de Dependencias.
 * Mantener esta lógica centralizada aquí permite que el resto de la
 * aplicación dependa solo de interfaces/abstracciones, sin acoplarse
 * a implementaciones concretas de infraestructura.
 */

import { RoleRepository } from '../infrastructure/database/typeorm/repositories/RoleRepository';
import { UserRepository } from '../infrastructure/database/typeorm/repositories/UserRepository';

import { PasswordService } from '../infrastructure/services/PasswordService';
import { TokenService } from '../infrastructure/services/TokenService';

import { AuthRoutes } from '../presentation/auth/AuthRoutes';
import { AuthController } from '../presentation/auth/AuthController';

import { LoginUser } from '../application/uses-cases/auth/LoginUser';

import { GetUsers } from '../application/uses-cases/user/GetUsers';
import { GetUserById } from '../application/uses-cases/user/GetUserById';
import { UpdateUser } from '../application/uses-cases/user/UpdateUser';
import { DeleteUser } from '../application/uses-cases/user/DeleteUser';
import { CreateUser } from '../application/uses-cases/auth/CreateUser';
import { UserController } from '../presentation/user/UserController';
import { UserRoutes } from '../presentation/user/UserRoutes';

// Auth
const userRepository = new UserRepository();
const roleRepository = new RoleRepository();

const passwordService = new PasswordService();
export const tokenService = new TokenService();

export const loginUser = new LoginUser(
  userRepository,
  passwordService,
  tokenService,
);

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

// User y Auth
export const authController = new AuthController(createUser, loginUser);
export const authRoutes = AuthRoutes(authController);

const userController = new UserController(
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
);

export const userRoutes = UserRoutes(userController);

// Categories
import { CategoryRepository } from '../infrastructure/database/typeorm/repositories/CategoryRepository';

import { CreateCategory } from '../application/uses-cases/categories/CreateCategory';
import { GetCategories } from '../application/uses-cases/categories/GetCategories';
import { GetCategoryById } from '../application/uses-cases/categories/GetCategoryById';
import { UpdateCategory } from '../application/uses-cases/categories/UpdateCategory';
import { DeleteCategory } from '../application/uses-cases/categories/DeleteCategory';

import { CategoryController } from '../presentation/categories/CategoryController';
import { CategoryRoutes } from '../presentation/categories/CategoryRoutes';

const categoryRepository = new CategoryRepository();

const createCategory = new CreateCategory(categoryRepository);
const getCategories = new GetCategories(categoryRepository);
const getCategoryById = new GetCategoryById(categoryRepository);
const updateCategory = new UpdateCategory(categoryRepository);
const deleteCategory = new DeleteCategory(categoryRepository);

const categoryController = new CategoryController(
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
);

export const categoryRoutes = CategoryRoutes(categoryController);

// Product
import { ProductRepository } from '../infrastructure/database/typeorm/repositories/ProductRepository';
import { CreateProduct } from '../application/uses-cases/product/CreateProduct';
import { GetProducts } from '../application/uses-cases/product/GetProducts';
import { GetProductById } from '../application/uses-cases/product/GetProductById';
import { DeleteProduct } from '../application/uses-cases/product/DeleteProduct';
import { UpdateProduct } from '../application/uses-cases/product/UpdateProduct';
import { ProductController } from '../presentation/product/ProductController';
import { ProductRoutes } from '../presentation/product/ProductRoutes';

const productRepository = new ProductRepository();

const createProduct = new CreateProduct(productRepository);
const getProducts = new GetProducts(productRepository);
const getProductById = new GetProductById(productRepository);
const updateProduct = new UpdateProduct(productRepository);
const deleteProduct = new DeleteProduct(productRepository);

const productController = new ProductController(
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
);

export const productRoutes = ProductRoutes(productController);
