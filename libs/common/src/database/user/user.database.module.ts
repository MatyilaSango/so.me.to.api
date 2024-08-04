import { Module } from '@nestjs/common';
import { databaseProviders } from './providers/database.provider';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from '@/libs/common/src';
import { UserService } from './services/user.service';
import { userProviders } from './providers/user.provider';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
  ],
  providers: [...databaseProviders, ...userProviders, UserService],
  exports: [...databaseProviders, ...userProviders],
})
export class UserDatabaseModule {}
