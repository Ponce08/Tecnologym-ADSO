import { UserRepository } from '../repositories/UserRepository';
import { RoleRepository } from '../repositories/RoleRepository';

import { UserMapper } from '../mappers/Usermapper';

import { hashPassword } from '../utils/hash';
import { comparePassword } from '../utils/hash';
import { generateToken } from '../utils/jwt';
// DTOs
import { UserResponseDto } from '../dtos/users/UserResponseDto';
import { LoginResponseDto } from '../dtos/auth/LoginResponseDto';
import { RegisterDto } from '../schemas/auth/register.schema';

export class AuthService {
  private userRepository = new UserRepository();
  private roleRepository = new RoleRepository();

  async register(userData: RegisterDto): Promise<UserResponseDto> {
    const existingUser = await this.userRepository.findByEmail(userData.email!);

    if (existingUser) {
      throw new Error('El correo electrónico ya se encuentra registrado.');
    }

    const role = await this.roleRepository.findByName('Cliente');

    if (!role) {
      throw new Error('El rol CLIENTE no existe.');
    }

    const hashedPassword = await hashPassword(userData.password!);

    const user = await this.userRepository.create({
      ...userData,
      password: hashedPassword,
      role,
    });

    return UserMapper.toResponse(user);
  }

  async login(email: string, password: string): Promise<LoginResponseDto> {
    // Normalizar el correo.
    email = email.trim().toLowerCase();

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('Correo o contraseña incorrectos.');
    }

    // Verificar que la cuenta esté activa.
    if (!user.active) {
      throw new Error('La cuenta se encuentra deshabilitada.');
    }

    // Comparar la contraseña enviada con el hash almacenado.
    const isValid = await comparePassword(password, user.password);

    if (!isValid) {
      throw new Error('Correo o contraseña incorrectos.');
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
