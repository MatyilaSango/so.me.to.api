import { Module } from '@nestjs/common';
import { JwtAuthMiddleware } from './jwt-auth/jwt-auth.middleware';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthModule } from '../jwt/jwtAuth.module';

@Module({
  imports: [JwtAuthModule],
  providers: [JwtAuthMiddleware, JwtService],
  exports: [JwtAuthMiddleware],
})
export class MiddlewareModule {}
