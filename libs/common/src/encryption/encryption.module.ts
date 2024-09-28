import { Module } from '@nestjs/common';
import { EncryptionService } from './encryption.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import keysConfig from '../configs/keys.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [keysConfig],
    }),
  ],
  providers: [EncryptionService, ConfigService],
  exports: [EncryptionService, ConfigService],
})
export class EncryptionModule {}
