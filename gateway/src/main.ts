import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ResponseInterceptor } from './modules/app/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(3000);
}
bootstrap();
