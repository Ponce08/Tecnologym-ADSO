import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { env } from './env';
import { Role } from '../entities/Role';
import { User } from '../entities/User';
/**
 * Configuración de la fuente de datos principal de la aplicación.
 *
 * Esta instancia administra la conexión con la base de datos PostgreSQL
 * alojada en Supabase mediante TypeORM. Además, permite ejecutar consultas,
 * gestionar entidades y realizar operaciones sobre la base de datos.
 */

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,

  synchronize: false,

  logging: true,

  entities: [Role, User],

  migrations: ['src/migrations/*.ts'],
});
