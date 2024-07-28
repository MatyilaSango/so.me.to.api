import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.USER_DB_HOST,
  port: process.env.USER_DB_PORT,
  database: process.env.USER_DB_DATABASE,
  username: process.env.USER_DB_USERNAME,
  password: process.env.USER_DB_PASSWORD,
}));
