import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LoggerService {
  constructor(private configService: ConfigService) {
    Logger.log(
      '\n====================================================================================================\n',
    );
    Logger.log(`App name: ${this.configService.get<string>('app.name')}`);
    Logger.log(`App verion: ${this.configService.get<string>('app.version')}`);
    Logger.log(
      `App microservices: ${this.configService.get<string>('app.microservices')}`,
    );
    Logger.log(
      '\n====================================================================================================\n',
    );
  }

  log(message: string) {
    Logger.log(message);
  }
}
