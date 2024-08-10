import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { LoggerModule } from '@/libs/common/src';
import { UserModule } from '../user/user.module';

@Module({
  imports: [AuthModule, UserModule, LoggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
