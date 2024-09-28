import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from '@/libs/common/src';
import { UserDatabaseService } from './services/user.database.service';
import { userProviders, userDataSoure } from './providers/user.provider';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
  ],
  providers: [...userDataSoure, ...userProviders, UserDatabaseService],
  exports: [...userDataSoure, ...userProviders],
})
export class UserDatabaseModule {}
