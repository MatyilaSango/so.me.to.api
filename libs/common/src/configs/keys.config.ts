import { registerAs } from '@nestjs/config';

export default registerAs('keys', () => ({
  tokenSecrete: process.env.TOKEN_SECRETE,
  tokenRefreshSecrete: process.env.TOKEN_REFRESH_SECRETE,
  encryption: {
    key: process.env.ENCRYPTION_KEY,
    iv: process.env.ENCRYPTION_IV,
    algorithm: process.env.ENCRYPTION_ALGORITHM,
  },
  saltRounds: process.env.SALT_ROUNDS,
}));
