import { registerAs } from '@nestjs/config';

export default registerAs('keys', () => ({
  token: {
    secrete: process.env.TOKEN_SECRETE,
    Refresh: process.env.TOKEN_REFRESH_SECRETE,
    expiry: {
      access: process.env.JWT_ACCESS_EXPIRES,
      refresh: process.env.JWT_REFRESH_EXPIRES,
    },
  },
  encryption: {
    key: process.env.ENCRYPTION_KEY,
    iv: process.env.ENCRYPTION_IV,
    algorithm: process.env.ENCRYPTION_ALGORITHM,
  },
  saltRounds: process.env.SALT_ROUNDS,
}));
