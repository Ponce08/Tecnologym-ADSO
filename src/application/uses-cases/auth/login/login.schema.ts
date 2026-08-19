import { z } from 'zod';

/**
 * Esquema para validar la información enviada
 * al iniciar sesión.
 */
export const loginSchema = z.object({
  email: z
    .email('Debe ingresar un correo electrónico válido.')
    .transform((email) => email.trim().toLowerCase()),

  password: z.string().trim().min(1, 'La contraseña es obligatoria.'),
});

/**
 * Tipo inferido automáticamente por Zod.
 *
 * Este tipo se utilizará en el AuthService y otros lugares
 * donde necesitemos trabajar con los datos del login.
 */
export type LoginDto = z.infer<typeof loginSchema>;
