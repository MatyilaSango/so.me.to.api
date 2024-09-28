import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LoggerService {
  constructor(private configService: ConfigService) {}

  log(message: string) {
    Logger.log(message);
  }
}
