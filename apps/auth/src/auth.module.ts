import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { LoggerModule } from '@/libs/common/src';
import { RabbitMQModule } from '@/libs/common/src';
import { UserDatabaseModule } from '@/libs/common/src';
import { UserDatabaseService } from '@/libs/common/src';
import { EncryptionModule } from '@/libs/common/src';
import { EncryptionService } from '@/libs/common/src';
import { JwtAuthModule } from '@/libs/common/src';

@Module({
  imports: [LoggerModule, RabbitMQModule, UserDatabaseModule, EncryptionModule, JwtAuthModule],
  controllers: [AuthController],
  providers: [AuthService, UserDatabaseService, EncryptionService],
})
export class AuthModule {}
