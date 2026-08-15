import { Router } from 'express';

import authRouter from '../modules/Auth/routes/auth.routes';
import usersRouter from '../modules/Users/routes/users.routes';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);

export default router;
