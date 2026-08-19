import { AppDataSource } from '../config/AppDataSource';

export async function connectDatabase(): Promise<void> {
  await AppDataSource.initialize();

  console.log('✅ Base de datos conectada.');
}
