import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { CommonModule } from '../common/common.module';
import { LoggerModule } from '@/libs/common/src';

@Module({
  imports: [AuthModule, CommonModule, LoggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
