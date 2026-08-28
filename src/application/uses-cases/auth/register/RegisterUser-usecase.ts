import { IRoleRepository } from '../../../../domain/repositories/RoleRepository.interface';
import { IUserRepository } from '../../../../domain/repositories/UserRepository.interface';
import { AppError } from '../../../errors/AppError';
import { IPasswordService } from '../../../services/PasswordService.interface';
import { RegisterDto } from './RegisterDto';

export class RegisterUser {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly roleRepository: IRoleRepository,
    private readonly passwordService: IPasswordService,
  ) {}

  async execute(registerData: RegisterDto) {
    const existingUser = await this.userRepository.findByEmail(
      registerData.email,
    );

    if (existingUser) {
      throw new AppError(
        'El correo ya está registrado',
        409,
        'EMAIL_ALREADY_EXISTS',
      );
    }

    const role = await this.roleRepository.findByName('Cliente');

    if (!role) {
      throw new AppError('El rol Cliente no existe.', 500, 'ROLE_NOT_EXISTS');
    }

    const hashedPassword = await this.passwordService.hash(
      registerData.password,
    );

    const user = await this.userRepository.create({
      ...registerData,
      password: hashedPassword,
      role,
    });

    return user;
  }
}
