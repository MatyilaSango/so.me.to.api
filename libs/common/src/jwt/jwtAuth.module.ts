import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.TOKEN_SECRETE,
      signOptions: { expiresIn: process.env.JWT_ACCESS_EXPIRES },
    }),
  ],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtAuthModule {}
