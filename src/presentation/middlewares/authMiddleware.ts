import { Request, Response, NextFunction } from 'express';
import { ITokenService } from '../../domain/services/TokenService.interface.';
import { AppError } from '../../application/errors/AppError';

/**
 * Middleware de autenticación: extrae y valida el token Bearer del header
 * Authorization, verifica su validez con el tokenService inyectado y, si es
 * correcto, adjunta el payload decodificado a req.user para que los
 * siguientes middlewares/controladores puedan acceder al usuario autenticado.
 */
export const authMiddleware = (tokenService: ITokenService) => {
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
