import { UserRepository } from '../../Users/repositories/UserRepository';
import { RoleRepository } from '../../Roles/repositories/RoleRepository';

import { UserMapper } from '../../Users/mappers/Usermapper';

import { hashPassword } from '../../../utils/hash';
import { comparePassword } from '../../../utils/hash';
import { generateToken } from '../../../utils/jwt';

import { AppError } from '../../../errors/AppError';

import { UserResponseDto } from '../../Users/DTOs/UserResponseDto';
import { LoginResponseDto } from '../DTOs/LoginResponseDto';
import { RegisterDto } from '../schemas/register.schema';
import { User } from '../../Users/entities/User';

export class AuthService {
  private userRepository = new UserRepository();
  private roleRepository = new RoleRepository();

  async register(userData: RegisterDto): Promise<UserResponseDto> {
    const existingUser = await this.userRepository.findByEmail(userData.email);

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

    const hashedPassword = await hashPassword(userData.password);

    const user = await this.userRepository.create({
      ...userData,
      password: hashedPassword,
      role,
    });

    return UserMapper.toResponse(user);
  }

  async login(email: string, password: string): Promise<LoginResponseDto> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Correo o contraseña incorrectos.');
    }

    // Verificar que la cuenta esté activa.
    if (!user.active) {
      throw new AppError('La cuenta se encuentra deshabilitada.');
    }

    // Comparar la contraseña enviada con el hash almacenado.
    const isValid = await comparePassword(password, user.password);

    if (!isValid) {
      throw new AppError('Correo o contraseña incorrectos.');
    }

    const token = generateToken({
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
