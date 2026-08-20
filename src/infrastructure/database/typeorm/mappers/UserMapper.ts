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
      entity.roleId,
    );
  }

  static toPersistence(user: User): UserEntity {
    const entity = new UserEntity();

    entity.id = user.id;
    entity.firstName = user.firstName;
    entity.lastName = user.lastName;
    entity.email = user.email;
    entity.password = user.password;
    entity.active = user.active;
    entity.roleId = user.roleId;

    return entity;
  }
}
