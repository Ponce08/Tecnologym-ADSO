import bcrypt from 'bcrypt';

/**
 * Número de rondas utilizadas por bcrypt para generar el hash.
 *
 * Un valor de 10 ofrece un buen equilibrio entre seguridad
 * y rendimiento para la mayoría de aplicaciones web.
 */
const SALT_ROUNDS = 10;

/**
 * Genera el hash de una contraseña.
 *
 * Nunca debe almacenarse la contraseña original en la base de datos.
 *
 * @param password Contraseña en texto plano.
 * @returns Hash generado por bcrypt.
 */
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Compara una contraseña en texto plano con un hash almacenado.
 *
 * Se utiliza durante el inicio de sesión para verificar
 * si la contraseña ingresada por el usuario es correcta.
 *
 * @param password Contraseña enviada por el usuario.
 * @param hashedPassword Hash almacenado en la base de datos.
 * @returns true si coinciden, false en caso contrario.
 */
export async function comparePassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}
