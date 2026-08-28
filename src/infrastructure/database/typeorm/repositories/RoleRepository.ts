import { Repository } from 'typeorm';
import { AppDataSource } from '../../../config/AppDataSource';
import { IRoleRepository } from '../../../../domain/repositories/RoleRepository.interface';
import { RoleEntity } from '../entities/RoleEntity';

export class RoleRepository implements IRoleRepository {
  private repository: Repository<RoleEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(RoleEntity);
  }

  async findByName(name: string): Promise<RoleEntity | null> {
    return this.repository.findOne({
      where: { name },
    });
  }
}
