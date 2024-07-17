import { NestFactory } from '@nestjs/core';
import { AppModule } from './gate-way/modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
