import { Module } from '@nestjs/common';
import { LoggerService } from '../common/services/logger.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [],
  providers: [LoggerService, ConfigService],
})
export class CommonModule {}
