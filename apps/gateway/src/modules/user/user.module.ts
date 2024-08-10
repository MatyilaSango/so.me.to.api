import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { RABBIT_MQ_QUEUE, RabbitMQModule } from '@/libs/common/src';

@Module({
  imports: [
    RabbitMQModule.register({
      name: 'USER_MICROSERVICE',
      queue: RABBIT_MQ_QUEUE.USER_QUEUE,
    }),
  ],
  controllers: [UserController],
  providers: [],
})
export class UserModule {}
