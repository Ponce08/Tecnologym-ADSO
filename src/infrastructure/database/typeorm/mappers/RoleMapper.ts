import { Role } from '../../../../domain/entities/Role';
import { RoleEntity } from '../entities/RoleEntity';

export class RoleMapper {
  static toDomain(entity: RoleEntity): Role {
    return new Role(entity.id, entity.name, entity.description);
  }

  static toPersistence(role: Role): RoleEntity {
    const entity = new RoleEntity();

    entity.id = role.id;
    entity.name = role.name;
    entity.description = role.description;

    return entity;
  }
}
