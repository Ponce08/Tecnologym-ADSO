import { Repository } from 'typeorm';
import {
  CreateUserData,
  IUserRepository,
  UpdateUserData,
} from '../../../../domain/repositories/UserRepository.interface';
import { AppDataSource } from '../../../config/AppDataSource';
import { UserMapper } from '../mappers/UserMapper';
import { UserEntity } from '../entities/UserEntity';
import { User } from '../../../../domain/entities/User';
import { AppError } from '../../../../application/errors/AppError';

export class UserRepository implements IUserRepository {
  private repository: Repository<UserEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(UserEntity);
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

  async findById(id: string): Promise<User | null> {
    const entity = await this.repository.findOne({
      where: { id },
      relations: ['role'],
    });

    if (!entity) {
      return null;
    }

    return UserMapper.toDomain(entity);
  }

  async findAll(): Promise<User[]> {
    const entities = await this.repository.find({
      relations: ['role'],
    });

    return entities.map((entity) => UserMapper.toDomain(entity));
  }

  async create(userData: CreateUserData): Promise<User> {
    const user = this.repository.create(userData);
    const saveUser = await this.repository.save(user);
    return UserMapper.toDomain(saveUser);
  }

  async update(id: string, userData: UpdateUserData): Promise<User> {
    await this.repository.update(id, userData);

    const updatedUser = await this.repository.findOne({
      where: { id },
      relations: ['role'],
    });

    if (!updatedUser) {
      throw new AppError('Usuario no encontrado', 404, 'USER_NOT_FOUND');
    }

    return UserMapper.toDomain(updatedUser);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
