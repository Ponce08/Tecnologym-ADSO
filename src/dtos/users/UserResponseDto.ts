/**
 * DTO utilizado para enviar información de un usuario
 * al cliente.
 *
 * Nunca debe incluir información sensible como la contraseña.
 */
export interface UserResponseDto {
  id: string;

  firstName: string;

  lastName: string;

  email: string;

  active: boolean;

  role: string;
}
