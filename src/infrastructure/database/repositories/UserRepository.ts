import { Repository } from 'typeorm';
import {
  CreateUserData,
  IUserRepository,
} from '../../../domain/repositories/iUserRepository';
import { User } from '../../../domain/entities/User';
import { AppDataSource } from '../../config/AppDataSource';

export class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({
      where: { email },
      relations: ['role'],
    });
  }

  async create(userData: CreateUserData): Promise<User> {
    const user = this.repository.create(userData);

    return this.repository.save(user);
  }
}
