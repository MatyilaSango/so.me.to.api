import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { CommonLibModule } from '@/libs/common/src';

@Module({
  imports: [CommonLibModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
