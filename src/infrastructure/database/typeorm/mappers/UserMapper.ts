import { User } from '../../../../domain/entities/User';
import { UserEntity } from '../entities/UserEntity';

export class UserMapper {
  static toDomain(entity: UserEntity): User {
    return new User(
      entity.id,
      entity.firstName,
      entity.lastName,
      entity.email,
      entity.password,
      entity.active,
      entity.role?.name,
    );
  }
}
