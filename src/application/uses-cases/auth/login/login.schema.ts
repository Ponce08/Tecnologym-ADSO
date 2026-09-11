import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .email('Debe ingresar un correo electrónico válido.')
    .transform((email) => email.trim().toLowerCase()),

  password: z.string().trim().min(1, 'La contraseña es obligatoria.'),
});

export type LoginDto = z.infer<typeof loginSchema>;
