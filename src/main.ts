import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.js';
import { Logger } from './utils/logger.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new Logger());
  const port = process.env.PORT ?? 5151;
  const environment = process.env.NODE_ENV ?? 'development';

  await app.listen(port);

  console.log('\n' + '='.repeat(50));
  console.log('✨  NestJS application successfully started');
  console.log('='.repeat(50));
  console.log(`🚀  Server is running on:   http://localhost:${port}`);
  console.log(`📦  Environment:            ${environment}`);
  console.log(`🕒  Started at:             ${new Date().toLocaleString()}`);
  console.log('='.repeat(50) + '\n');
}
await bootstrap();
