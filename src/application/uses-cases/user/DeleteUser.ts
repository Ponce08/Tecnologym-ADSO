import { IUserRepository } from '../../../domain/repositories/UserRepository.interface';
import { AppError } from '../../errors/AppError';

export class DeleteUser {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string | string[]): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError('Usuario no encontrado', 404, 'USER_NOT_FOUND');
    }

    await this.userRepository.delete(id);
  }
}
