import { z } from 'zod';

/**
 * Esquema base de validación para el registro público de usuarios (nombre,
 * apellido, correo y contraseña con requisitos de complejidad); createUserSchema
 * lo extiende agregando roleName para permitir la creación administrativa de
 * usuarios con un rol específico (Admin o Cliente).
 */
export const registerSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, 'El nombre debe tener al menos 2 caracteres.')
    .max(100, 'El nombre no puede superar los 100 caracteres.'),

  lastName: z
    .string()
    .trim()
    .min(2, 'El apellido debe tener al menos 2 caracteres.')
    .max(100, 'El apellido no puede superar los 100 caracteres.'),

  email: z
    .email('Debe ingresar un correo electrónico válido.')
    .transform((email) => email.trim().toLowerCase()),

  password: z
    .string()
    .min(8, 'La contraseña debe tener mínimo 8 caracteres.')
    .max(100, 'La contraseña no puede superar los 100 caracteres.')
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
      'La contraseña debe contener al menos una mayúscula, una minúscula y un número.',
    ),
});

export const createUserSchema = registerSchema.extend({
  roleName: z.enum(['Admin', 'Cliente'], {
    message: 'El rol debe ser Admin o Cliente.',
  }),
});

export const updateRegisterSchema = registerSchema.partial();
