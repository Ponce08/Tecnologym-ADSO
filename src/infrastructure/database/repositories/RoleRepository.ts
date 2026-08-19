import { Repository } from 'typeorm';
import { Role } from '../../../domain/entities/Role';
import { AppDataSource } from '../../config/AppDataSource';
import { IRoleRepository } from '../../../domain/repositories/iRoleRepository';

export class RoleRepository implements IRoleRepository {
  private repository: Repository<Role>;

  constructor() {
    this.repository = AppDataSource.getRepository(Role);
  }

  async findByName(name: string): Promise<Role | null> {
    return this.repository.findOne({
      where: { name },
    });
  }
}
