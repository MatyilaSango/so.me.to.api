import { registerAs } from '@nestjs/config';
import { APP_MICROSERVICES } from '../types/enums/app.enums';

export default registerAs('app', () => ({
  name: process.env.APP_NAME,
  version: process.env.APP_VERSION,
  microservices: [APP_MICROSERVICES.AUTH_MICROSERVICE],
  access: process.env.SECRETE,
  refresh: process.env.REFRESH_SECRETE,
  rabbitMq: {
    host: process.env.RABBIT_MQ_HOST,
    port: process.env.RABBIT_MQ_PORT,
    user: process.env.RABBIT_MQ_USER,
    password: process.env.RABBIT_MQ_PASSWORD,
  },
}));
