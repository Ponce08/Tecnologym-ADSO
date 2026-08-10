import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { AppError } from '../errors/AppError';

export const authMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return next(new AppError('Token de autenticación requerido', 401));
  }

  const [type, token] = authorization.split(' ');

  if (type !== 'Bearer' || !token) {
    return next(new AppError('Formato de token inválido', 401));
  }

  try {
    const payload = verifyToken(token);

    req.user = payload;

    next();
  } catch {
    next(new AppError('Token inválido o expirado', 401));
  }
};
