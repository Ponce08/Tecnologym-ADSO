import { IRoleRepository } from '../../../domain/repositories/RoleRepository.interface';
import { IUserRepository } from '../../../domain/repositories/UserRepository.interface';
import { AppError } from '../../errors/AppError';
import { IPasswordService } from '../../services/PasswordService.interface';
import { createUserDto } from '../auth/register/register.schema';

export class CreateUser {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly roleRepository: IRoleRepository,
    private readonly passwordService: IPasswordService,
  ) {}

  async execute(data: createUserDto) {
    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new AppError(
        'El correo ya está registrado',
        409,
        'EMAIL_ALREADY_EXISTS',
      );
    }

    const role = await this.roleRepository.findByName(data.roleName);

    if (!role) {
      throw new AppError('El rol no existe.', 404, 'ROLE_NOT_EXISTS');
    }

    const hashedPassword = await this.passwordService.hash(data.password);

    const user = await this.userRepository.create({
      ...data,
      password: hashedPassword,
      role,
    });

    return user;
  }
}
