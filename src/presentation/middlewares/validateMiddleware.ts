import { NextFunction, Request, Response } from 'express';
import { ZodType } from 'zod';

/**
 * Middleware genérico para validar la información
 * recibida en el cuerpo (body) de una petición HTTP
 * utilizando un esquema de Zod.
 *
 * Si los datos son válidos:
 *   - reemplaza req.body con los datos transformados
 *   - continúa al siguiente middleware o controlador
 */
export function validateMiddleware<T>(schema: ZodType<T>) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      next(result.error);
      return;
    }

    req.body = result.data;
    next();
  };
}
