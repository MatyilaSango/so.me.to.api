import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import Interceptors from './modules/app/interceptors';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggerService } from '@/libs/common/src/logger/logger.service';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { NestApplication } from '@/libs/common/src';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');

  const { ResponseInterceptor, ExceptionInterceptor } = Interceptors;

  app.useGlobalInterceptors(new ResponseInterceptor(), new ExceptionInterceptor());

  app.useGlobalPipes(new ValidationPipe());

  NestApplication.setApplications(app);

  const loggerService = app.get<LoggerService>(LoggerService);
  const configService = app.get<ConfigService>(ConfigService);

  loggerService.log(
    '\n====================================================================================================\n',
  );
  loggerService.log(`App name: ${configService.get<string>('app.name')}`);
  loggerService.log(`App verion: ${configService.get<string>('app.version')}`);
  loggerService.log(`App microservices: ${configService.get<string>('app.microservices')}`);
  loggerService.log(
    '\n====================================================================================================\n',
  );

  const config = new DocumentBuilder()
    .setTitle(configService.get<string>('app.name'))
    .setDescription(`The ${configService.get<string>('app.name')}`)
    .setVersion(configService.get<string>('app.version'))
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
