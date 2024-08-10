import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { RabbitMQModule, RABBIT_MQ_QUEUE } from '@/libs/common/src';
import {} from '@/libs/common/src';

@Module({
  imports: [
    RabbitMQModule.register({
      name: 'AUTH_MICROSERVICE',
      queue: RABBIT_MQ_QUEUE.AUTH_QUEUE,
    }),
  ],
  controllers: [AuthController],
  providers: [],
})
export class AuthModule {}
