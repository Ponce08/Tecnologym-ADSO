import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodType } from 'zod';

/**
 * Middleware genérico para validar la información
 * recibida en el cuerpo (body) de una petición HTTP
 * utilizando un esquema de Zod.
 *
 * Si los datos son válidos:
 *   - reemplaza req.body con los datos transformados
 *   - continúa al siguiente middleware o controlador
 *
 * Si los datos son inválidos:
 *   - responde con HTTP 400
 *   - devuelve los errores de validación
 */
export function validate<T>(schema: ZodType<T>) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = Object.fromEntries(
        result.error.issues.map((issue) => [
          issue.path.join('.'),
          issue.message,
        ]),
      );

      res.status(400).json({
        success: false,
        message: 'Error de validación.',
        errors,
      });

      return;
    }

    req.body = result.data;

    next();
  };
}
