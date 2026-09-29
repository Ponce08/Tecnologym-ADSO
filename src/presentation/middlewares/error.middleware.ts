import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../../application/errors/AppError';
import { EntityNotFoundError, QueryFailedError, TypeORMError } from 'typeorm';

/**
 * /**
 * Middleware centralizado de manejo de errores (debe registrarse al final de
 * la cadena de middlewares de Express). Loguea internamente cada error con
 * su contexto (método, URL, stack) y traduce cada tipo de error conocido
 * (AppError, validación Zod, errores de TypeORM, JSON malformado) a una
 * respuesta HTTP consistente y segura para el cliente, evitando exponer
 * detalles internos como el stack trace. Cualquier error no reconocido cae
 * en el bloque final como 500 genérico.
 *
 * ============  INFORMACIÓN DE DIAGNÓSTICO  =============
 * Esta información es para nosotros como desarrolladores.
 * Nunca debemos enviarla directamente al cliente en producción.
 */
export const errorMiddleware = (
  error: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  console.error('\n========== ERROR ==========');
  console.error('METHOD:', req.method);
  console.error('URL:', req.originalUrl);
  if (error instanceof Error) {
    console.error('TYPE:', error.name);
    console.error('MESSAGE:', error.message);
    console.error('STACK:', error.stack);
  } else {
    console.error('UNKNOWN ERROR:', error);
  }
  console.error('===========================\n');

  // Errores de aplicación
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      success: false,
      error: {
        code: error.code,
        message: error.message,
      },
    });

    return;
  }

  // Errores de validación Zod
  if (error instanceof ZodError) {
    const details = error.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));

    res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Los datos enviados no son válidos',
        details,
      },
    });

    return;
  }

  // ERRORES DE TYPEORM
  if (error instanceof QueryFailedError) {
    console.error('TYPEORM QUERY FAILED');
    console.error('DATABASE ERROR:', error.driverError);
    res.status(500).json({
      success: false,
      error: {
        code: 'DATABASE_ERROR',
        message:
          'Ha ocurrido un error al procesar la operación en la base de datos',
      },
    });
    return;
  }

  if (error instanceof EntityNotFoundError) {
    res.status(404).json({
      success: false,
      error: {
        code: 'ENTITY_NOT_FOUND',
        message: 'El recurso solicitado no fue encontrado',
      },
    });
    return;
  }

  if (error instanceof TypeORMError) {
    console.error('TYPEORM ERROR');
    console.error(error);
    res.status(500).json({
      success: false,
      error: {
        code: 'DATABASE_ERROR',
        message: 'Ha ocurrido un error relacionado con la base de datos',
      },
    });
    return;
  }

  // ERROR DE JSON / BODY PARSER
  if (error instanceof SyntaxError && 'body' in error) {
    res.status(400).json({
      success: false,
      error: {
        code: 'INVALID_JSON',
        message: 'El cuerpo de la solicitud contiene un JSON inválido',
      },
    });
    return;
  }

  // Error desconocido
  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Ha ocurrido un error interno en el servidor',
    },
  });
};
