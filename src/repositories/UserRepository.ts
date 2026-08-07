import { Repository } from 'typeorm';
import { AppDataSource } from '../config/data-source';
import { User } from '../entities/User';
import { RegisterDto } from '../schemas/auth/register.schema';
import { UserResponseDto } from '../dtos/users/UserResponseDto';

/**
 * Repositorio encargado de todas las operaciones relacionadas
 * con la entidad User.
 *
 * Su responsabilidad es únicamente acceder a la base de datos.
 * No debe contener reglas de negocio (esas pertenecen al Service).
 */
export class UserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.repository.create(userData);

    await this.repository.save(user);
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.repository.findOne({
      where: { email },
      relations: ['role'],
    });
  }

  async findById(id: string): Promise<User | null> {
    return await this.repository.findOne({
      where: { id },
      relations: ['role'],
    });
  }
}
