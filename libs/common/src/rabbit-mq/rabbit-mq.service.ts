import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqContext, RmqOptions, Transport } from '@nestjs/microservices';
import { RABBIT_MQ_QUEUE } from '../types/enums/rabbit-mq.enum';

@Injectable()
export class RabbitMQService {
  constructor(private configService: ConfigService) {}

  private constructRabbitMQURL = () => {
    const { host, port, user, password } = this.configService.get<object>(
      'app.rabbitMq',
    ) as any;

    return `amqp://${user}:${password}@${host}:${port}`;
  };

  getOptions(queue: RABBIT_MQ_QUEUE, noAck = false): RmqOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [this.constructRabbitMQURL()],
        queue,
        noAck,
        persistent: true,
      },
    };
  }

  ack(context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    channel.ack(originalMessage);
  }
}
