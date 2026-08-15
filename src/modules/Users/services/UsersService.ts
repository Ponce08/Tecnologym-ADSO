import { UserRepository } from '../repositories/UserRepository';
import { UserResponseDto } from '../DTOs/UserResponseDto';
import { AppError } from '../../../errors/AppError';
import { UserMapper } from '../mappers/Usermapper';

export class UsersService {
  private userRepository = new UserRepository();

  async getCurrentUser(userId: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError('Usuario no encontrado', 404);
    }

    return UserMapper.toResponse(user);
  }
}
