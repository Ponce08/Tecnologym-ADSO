import { Router } from 'express';

import { UsersController } from '../controllers/UsersController';
import { authMiddleware } from '../../Auth/middlewares/authMiddleware';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.get('/me', authMiddleware, usersController.me);

export default usersRouter;
