import { Repository } from 'typeorm';

import { Role } from '../entities/Role';
import { AppDataSource } from '../../../config/data-source';

export class RoleRepository {
  private repository: Repository<Role>;

  constructor() {
    this.repository = AppDataSource.getRepository(Role);
  }

  /**
   * Obtiene todos los roles.
   */
  async findAll(): Promise<Role[]> {
    return await this.repository.find();
  }

  /**
   * Busca un rol por su id.
   */
  async findById(id: string): Promise<Role | null> {
    return await this.repository.findOne({
      where: { id },
    });
  }

  /**
   * Busca un rol por su nombre.
   */
  async findByName(name: string): Promise<Role | null> {
    return await this.repository.findOne({
      where: { name },
    });
  }

  /**
   * Crea un nuevo rol.
   */
  async create(role: Partial<Role>): Promise<Role> {
    const newRole = this.repository.create(role);

    await this.repository.save(newRole);

    return newRole;
  }
}
