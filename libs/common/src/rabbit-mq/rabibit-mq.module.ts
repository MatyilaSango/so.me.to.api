import { DynamicModule, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQService } from './rabbit-mq.service';
import { RABBIT_MQ_QUEUE } from '../types/enums/rabbit-mq.enum';
import { APP_MICROSERVICES } from '../types/enums/app.enums';
import { ConfigService } from '@nestjs/config';

interface RmqModuleOptions {
  name: keyof typeof APP_MICROSERVICES;
  queue: RABBIT_MQ_QUEUE;
}

@Module({
  providers: [RabbitMQService, ConfigService],
  exports: [RabbitMQService, ConfigService],
})
export class RabbitMQModule {
  static register({ name, queue }: RmqModuleOptions): DynamicModule {
    return {
      module: RabbitMQModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name,
            useFactory: () => ({
              transport: Transport.RMQ,
              options: {
                urls: [
                  `amqp://${process.env.RABBIT_MQ_USER}:${process.env.RABBIT_MQ_PASSWORD}@${process.env.RABBIT_MQ_HOST}:${process.env.RABBIT_MQ_PORT}`,
                ],
                queue,
              },
            }),
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}
