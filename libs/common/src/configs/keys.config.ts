import { registerAs } from '@nestjs/config';

export default registerAs('keys', () => ({
  secrete: process.env.SECRETE,
  refreshSecrete: process.env.REFRESH_SECRETE,
  encryption: process.env.ENCRYPTION_KEY,
  hashing: process.env.HASHING_KEY,
}));
