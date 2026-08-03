import 'reflect-metadata';
import app from './app';
import { AppDataSource } from './config/data-source';
import { env } from './config/env';

async function startServer() {
  try {
    await AppDataSource.initialize();

    console.log('✅ Base de datos conectada.');

    app.listen(env.PORT, () => {
      console.log(`🚀 API Tecnologym ejecutándose en el puerto ${env.PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al conectar la base de datos:');
    console.error(error);
    process.exit(1);
  }
}

startServer();
