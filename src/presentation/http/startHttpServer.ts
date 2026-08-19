import app from '../../app';
import { env } from '../../infrastructure/config/env';

export function startHttpServer(): void {
  app.listen(env.PORT, () => {
    console.log(`🚀 API Tecnologym ejecutándose en el puerto ${env.PORT}`);
  });
}
