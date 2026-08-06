import { User } from '../entities/User';
import { UserResponseDto } from '../dtos/users/UserResponseDto';

/**
 * Mapper encargado de transformar la entidad User
 * en un UserResponseDto.
 *
 * De esta forma nunca exponemos directamente
 * la entidad de TypeORM al cliente.
 */
export class UserMapper {
  /**
   * Convierte una entidad User en un UserResponseDto.
   *
   * @param user Entidad obtenida desde la base de datos.
   * @returns DTO listo para enviar al cliente.
   */
  static toResponse(user: User): UserResponseDto {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      active: user.active,
      role: user.role.name,
    };
  }
}
