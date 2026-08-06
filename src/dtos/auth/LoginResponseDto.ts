import { UserResponseDto } from '../users/UserResponseDto';

/**
 * DTO devuelto después de un inicio de sesión exitoso.
 */
export interface LoginResponseDto {
  user: UserResponseDto;

  token: string;
}
