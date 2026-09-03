import { IUserRepository } from '../../../domain/repositories/UserRepository.interface';

export class GetUsers {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute() {
    return await this.userRepository.findAll();
  }
}
