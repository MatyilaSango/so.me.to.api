import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { LoggerModule } from '@/libs/common/src';
import { RabbitMQModule } from '@/libs/common/src';

@Module({
  imports: [LoggerModule, RabbitMQModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
