import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';
import { AppError } from '../errors/AppError';
import { UserMapper } from '../mappers/Usermapper';

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
    const { email, password } = req.body;

    const user = await this.authService.login(email, password);

    res.status(200).json({
      success: true,
      message: 'Inicio de sesión exitoso.',
      data: user,
    });
  };

  me = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.sub;

    if (!userId) {
      throw new AppError('Usuario no autenticado', 401);
    }
    const user = await this.authService.getCurrentUser(userId);

    res.status(200).json({
      success: true,
      data: UserMapper.toResponse(user),
    });
  };
}
