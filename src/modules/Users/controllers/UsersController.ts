import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../services/UsersService';
import { AppError } from '../../../errors/AppError';

export class UsersController {
  private usersService = new UsersService();

  me = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const userId = req.user?.sub;

    if (!userId) {
      throw new AppError('Usuario no autenticado', 401);
    }
    const user = await this.usersService.getCurrentUser(userId);

    res.status(200).json({
      success: true,
      data: user,
    });
  };
}
