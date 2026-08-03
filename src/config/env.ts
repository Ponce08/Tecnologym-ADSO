import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

/**
 * Esquema de validación de las variables de entorno.
 *
 * Define todas las variables requeridas por la aplicación y sus tipos
 * utilizando Zod. Si alguna variable falta o tiene un formato incorrecto,
 * la aplicación no iniciará.
 */
const envSchema = z.object({
  PORT: z.coerce.number().default(3000),

  DB_HOST: z.string().min(1, 'DB_HOST es obligatorio'),
  DB_PORT: z.coerce.number(),
  DB_USERNAME: z.string().min(1, 'DB_USERNAME es obligatorio'),
  DB_PASSWORD: z.string().min(1, 'DB_PASSWORD es obligatorio'),
  DB_DATABASE: z.string().min(1, 'DB_DATABASE es obligatorio'),

  JWT_SECRET: z
    .string()
    .min(10, 'JWT_SECRET debe tener al menos 10 caracteres'),
});

/**
 * Validar las variables de entorno
 */
const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error('❌ Error en las variables de entorno\n');

  console.table(result.error.flatten().fieldErrors);

  process.exit(1);
}

/**
 * Exportar las variables ya validadas
 */
export const env = result.data;
