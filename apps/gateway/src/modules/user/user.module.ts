import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { JwtAuthMiddleware, RABBIT_MQ_QUEUE, RabbitMQModule } from '@/libs/common/src';
import { MiddlewareModule } from '@/libs/common/src/middlewares/middleware.module';

@Module({
  imports: [
    RabbitMQModule.register({
      name: 'USER_MICROSERVICE',
      queue: RABBIT_MQ_QUEUE.USER_QUEUE,
    }),
    MiddlewareModule,
  ],
  controllers: [UserController],
  providers: [JwtAuthMiddleware],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtAuthMiddleware).forRoutes(UserController);
  }
}
