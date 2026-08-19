import { IUserRepository } from '../../../../domain/repositories/iUserRepository';
import { AppError } from '../../../errors/AppError';
import { UserMapper } from '../../../mappers/Usermapper';
import { IPasswordService } from '../../../services/IPasswordService';
import { ITokenService } from '../../../services/ITokenService';
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
      throw new AppError('Correo o contraseña incorrectos.');
    }

    if (!user.active) {
      throw new AppError('La cuenta se encuentra deshabilitada.');
    }

    const isValid = await this.passwordService.compare(
      loginData.password,
      user.password,
    );

    if (!isValid) {
      throw new AppError('Correo o contraseña incorrectos.');
    }

    const token = this.tokenService.generate({
      sub: user.id,
      email: user.email,
      role: user.role.name,
    });

    return {
      user: UserMapper.toResponse(user),
      token,
    };
  }
}
