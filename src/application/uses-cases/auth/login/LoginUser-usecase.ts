import { IUserRepository } from '../../../../domain/repositories/UserRepository.interface';
import { AppError } from '../../../errors/AppError';
import { IPasswordService } from '../../../services/PasswordService.interface';
import { ITokenService } from '../../../services/TokenService.interface.';
import { LoginDto } from './LoginDto';

export class LoginUser {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordService: IPasswordService,
    private readonly tokenService: ITokenService,
  ) {}

  async execute(loginData: LoginDto) {
    const user = await this.userRepository.findByEmail(loginData.email);

    if (!user) {
      throw new AppError(
        `El correo ${loginData.email} no existe`,
        404,
        'EMAIL_NOT_EXISTS',
      );
    }

    if (!user.active) {
      throw new AppError(
        'La cuenta se encuentra deshabilitada.',
        401,
        'ACCOUNT_DISABLED',
      );
    }

    const isValid = await this.passwordService.compare(
      loginData.password,
      user.password,
    );

    if (!isValid) {
      throw new AppError(
        'Correo o contraseña incorrectos.',
        401,
        'INCORRECT_PASSWORD_OR_EMAIL',
      );
    }

    const token = this.tokenService.generate({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      user,
      token,
    };
  }
}
