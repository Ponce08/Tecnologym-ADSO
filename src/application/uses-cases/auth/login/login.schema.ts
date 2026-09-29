import { z } from 'zod';

/**
 * Esquema de validación para el login: normaliza el correo (trim + lowercase)
 * y exige una contraseña no vacía, usando Zod tanto para validar el formato
 * como para inferir el tipo LoginDto usado en el caso de uso.
 */
export const loginSchema = z.object({
  email: z
    .email('Debe ingresar un correo electrónico válido.')
    .transform((email) => email.trim().toLowerCase()),

  password: z.string().trim().min(1, 'La contraseña es obligatoria.'),
});

export type LoginDto = z.infer<typeof loginSchema>;
