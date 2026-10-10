import { z } from 'zod';

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede superar los 100 caracteres'),

  description: z
    .string()
    .trim()
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(1000, 'La descripción no puede superar los 1000 caracteres'),

  price: z.number().positive('El precio debe ser mayor que cero'),

  stock: z
    .number()
    .int('El stock debe ser un entero')
    .min(0, 'El stock no puede ser negativo'),

  image: z.url('Debe proporcionar una URL válida').nullable(),

  active: z.boolean().default(true),

  categoryId: z.uuid('El ID de la categoría debe ser un UUID válido'),
});

export const updateProductSchema = productSchema.partial();
