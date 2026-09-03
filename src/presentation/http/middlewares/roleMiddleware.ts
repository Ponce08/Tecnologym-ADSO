import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../../application/errors/AppError';

export function roleMiddleware(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      if (!req.user) {
        throw new AppError(
          'Usuario no autenticado',
          401,
          'UNAUTHENTICATED_USER',
        );
      }

      if (!allowedRoles.includes(req.user.role)) {
        throw new AppError(
          'No tienes permisos para realizar esta acción',
          403,
          'PERMISSION_DENIED',
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}
