import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  name: process.env.APP_NAME,
  version: process.env.APP_VERSION,
  microservices: ['Auth'],
}));
