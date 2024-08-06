import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { LoggerModule } from '@/libs/common/src';
import { RabbitMQModule } from '@/libs/common/src';
import { UserDatabaseModule } from '@/libs/common/src/database/user/user.database.module';
import { UserDatabaseService } from '@/libs/common/src/database/user/services/user.database.service';

@Module({
  imports: [LoggerModule, RabbitMQModule, UserDatabaseModule],
  controllers: [AuthController],
  providers: [AuthService, UserDatabaseService],
})
export class AuthModule {}
