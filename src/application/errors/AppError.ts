/**
 * Clase base para errores controlados de la aplicación (errores de negocio,
 * validación, recursos no encontrados, etc.), a diferencia de errores
 * inesperados del sistema.
 *
 * Se usa junto con el middleware centralizado de errores: cualquier error
 * lanzado como instancia de AppError (o una subclase) es reconocido allí
 * y se responde al cliente con el statusCode y code definidos aquí,
 * en lugar de caer en el manejo genérico de "error desconocido" (500).
 *
 */
export class AppError extends Error {
  /** Código de estado HTTP a devolver en la respuesta (ej. 400, 404, 409). */
  public readonly statusCode: number;

  /** Código interno identificador del error, útil para el cliente/frontend
   *  (ej. 'VALIDATION_ERROR', 'USER_NOT_FOUND'), independiente del texto
   *  del mensaje que puede cambiar. */
  public readonly code: string;

  constructor(
    message: string,
    statusCode: number = 500,
    code: string = 'INTERNAL_SERVER_ERROR',
  ) {
    super(message);

    this.name = 'AppError';
    this.statusCode = statusCode;
    this.code = code;

    // Excluye el constructor del stack trace, para que este apunte
    // directamente a donde se instanció el error (más limpio para debug).
    Error.captureStackTrace(this, this.constructor);
  }
}
