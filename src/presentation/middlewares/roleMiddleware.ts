import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../application/errors/AppError';

/**
 * Middleware de autorización por rol: debe usarse después de authMiddleware
 * (requiere que req.user ya esté seteado). Recibe la lista de roles
 * permitidos para la ruta y rechaza la petición con 401 si no hay usuario
 * autenticado, o con 403 si el rol del usuario no está entre los permitidos.
 *
 * Ejemplo de uso:
 *   router.delete('/users/:id', authMiddleware(tokenService), roleMiddleware('Admin'), ...)
 */
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
