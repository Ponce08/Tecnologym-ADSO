import { Repository } from 'typeorm';
import {
  CreateUserData,
  IUserRepository,
} from '../../../../domain/repositories/UserRepository.interface';
import { User } from '../../../../domain/entities/User';
import { AppDataSource } from '../../../config/AppDataSource';
import { UserMapper } from '../mappers/UserMapper';

export class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async findByEmail(email: string): Promise<User | null> {
    const entity = await this.repository.findOne({
      where: { email },
      relations: ['role'],
    });

    if (!entity) {
      return null;
    }

    return UserMapper.toDomain(entity);
  }

  async create(userData: CreateUserData): Promise<User> {
    const user = this.repository.create(userData);

    return this.repository.save(UserMapper.toPersistence(user));
  }
}
