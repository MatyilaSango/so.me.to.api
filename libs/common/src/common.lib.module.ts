import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './configs/app.config';
import { LoggerService } from './services/logger.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
    }),
  ],
  providers: [CommonService, LoggerService, ConfigService],
  exports: [CommonService, LoggerService, ConfigService],
})
export class CommonLibModule {}
