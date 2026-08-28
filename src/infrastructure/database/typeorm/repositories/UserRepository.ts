import { Repository } from 'typeorm';
import {
  CreateUserData,
  IUserRepository,
} from '../../../../domain/repositories/UserRepository.interface';
import { AppDataSource } from '../../../config/AppDataSource';
import { UserMapper } from '../mappers/UserMapper';
import { UserEntity } from '../entities/UserEntity';
import { User } from '../../../../domain/entities/User';

export class UserRepository implements IUserRepository {
  private repository: Repository<UserEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(UserEntity);
  }

  async findByEmail(email: string): Promise<User | null> {
    const entity = await this.repository.findOne({
      where: { email },
    });

    if (!entity) {
      return null;
    }

    return UserMapper.toDomain(entity);
  }

  async create(userData: CreateUserData): Promise<User> {
    const user = this.repository.create(userData);
    const saveUser = await this.repository.save(user);
    return UserMapper.toDomain(saveUser);
  }
}
