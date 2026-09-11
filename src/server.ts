import 'reflect-metadata';

import { startHttpServer } from './presentation/startHttpServer';
import { connectDatabase } from './infrastructure/config/AppDataSource';

async function bootstrap(): Promise<void> {
  try {
    await connectDatabase();

    startHttpServer();
  } catch (error) {
    console.error('❌ Error al iniciar la aplicación:');
    console.error(error);

    process.exit(1);
  }
}

bootstrap();
