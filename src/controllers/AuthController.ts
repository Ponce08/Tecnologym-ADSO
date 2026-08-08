import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';

/**
 * Controlador encargado de gestionar las solicitudes HTTP
 * relacionadas con la autenticación.
 *
 * Su responsabilidad es:
 * - Recibir la petición.
 * - Obtener los datos enviados por el cliente.
 * - Invocar el AuthService.
 * - Devolver una respuesta HTTP.
 */
export class AuthController {
  private authService = new AuthService();

  register = async (req: Request, res: Response): Promise<void> => {
    const userData = req.body;

    const user = await this.authService.register(userData);

    res.status(201).json({
      success: true,
      message: 'Usuario registrado correctamente.',
      data: user,
    });
  };

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      const user = await this.authService.login(email, password);

      res.status(200).json({
        success: true,
        message: 'Inicio de sesión exitoso.',
        data: user,
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error instanceof Error ? error.message : 'No autorizado.',
      });
    }
  };
}
