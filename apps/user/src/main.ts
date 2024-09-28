import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { RABBIT_MQ_QUEUE, RabbitMQService } from '@/libs/common/src';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);

  const rabbitMqService = app.get<RabbitMQService>(RabbitMQService);

  app.connectMicroservice<MicroserviceOptions>(rabbitMqService.getOptions(RABBIT_MQ_QUEUE.USER_QUEUE, true));

  app.startAllMicroservices();
}
bootstrap();
