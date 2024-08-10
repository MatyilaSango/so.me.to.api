import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { RabbitMQService } from '@/libs/common/src';
import { RABBIT_MQ_QUEUE } from '@/libs/common/src';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  const rabbitMqService = app.get<RabbitMQService>(RabbitMQService);

  app.connectMicroservice<MicroserviceOptions>(rabbitMqService.getOptions(RABBIT_MQ_QUEUE.AUTH_QUEUE, true));

  app.startAllMicroservices();
}
bootstrap();
