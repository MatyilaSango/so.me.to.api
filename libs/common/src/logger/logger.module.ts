import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from '../configs/app.config';
import { LoggerService } from './logger.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
    }),
  ],
  providers: [LoggerService, ConfigService],
  exports: [LoggerService, ConfigService],
})
export class LoggerModule {}
