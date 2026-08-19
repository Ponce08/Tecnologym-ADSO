import { Request, Response, NextFunction } from 'express';

import { ITokenService } from '../../../application/services/ITokenService';

import { AppError } from '../../../application/errors/AppError';

export const createAuthMiddleware = (tokenService: ITokenService) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return next(new AppError('Token de autenticación requerido', 401));
    }

    const [type, token] = authorization.split(' ');

    if (type !== 'Bearer' || !token) {
      return next(new AppError('Formato de token inválido', 401));
    }

    try {
      const payload = tokenService.verify(token);

      req.user = payload;

      next();
    } catch {
      next(new AppError('Token inválido o expirado', 401));
    }
  };
};
