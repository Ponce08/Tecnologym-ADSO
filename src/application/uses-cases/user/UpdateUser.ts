import {
  IUserRepository,
  UpdateUserData,
} from '../../../domain/repositories/UserRepository.interface';
import { AppError } from '../../errors/AppError';

export class UpdateUser {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string | string[], userData: UpdateUserData) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError('Usuario no encontrado', 404, 'USER_NOT_FOUND');
    }

    return await this.userRepository.update(id, userData);
  }
}
