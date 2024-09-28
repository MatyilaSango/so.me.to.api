import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import {
  EncryptionModule,
  EncryptionService,
  LoggerModule,
  RabbitMQModule,
  UserDatabaseModule,
  UserDatabaseService,
} from '@/libs/common/src';

@Module({
  imports: [LoggerModule, RabbitMQModule, UserDatabaseModule, EncryptionModule],
  controllers: [UserController],
  providers: [UserService, UserDatabaseService, EncryptionService],
})
export class UserModule {}
