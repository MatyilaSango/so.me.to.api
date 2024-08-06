import { Module } from '@nestjs/common';
import { databaseProviders } from './providers/database.provider';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from '@/libs/common/src';
import { UserDatabaseService } from './services/user.database.service';
import { userProviders } from './providers/user.provider';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
  ],
  providers: [...databaseProviders, ...userProviders, UserDatabaseService],
  exports: [...databaseProviders, ...userProviders],
})
export class UserDatabaseModule {}
