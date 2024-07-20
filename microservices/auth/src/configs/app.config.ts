import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  secrete: {
    access: process.env.SECRETE,
    refresh: process.env.REFRESH_SECRETE,
  },
}));
