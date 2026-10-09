import { z } from 'zod';

export const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede superar los 100 caracteres'),
  description: z
    .string()
    .trim()
    .max(255, 'La descripción no puede superar los 255 caracteres')
    .optional(),
});

export const updateCategorySchema = categorySchema.partial();
