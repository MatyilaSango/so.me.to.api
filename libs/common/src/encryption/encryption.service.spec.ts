import { Test, TestingModule } from '@nestjs/testing';
import { EncryptionService } from './encryption.service';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

describe('EncryptionService', () => {
  let service: EncryptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EncryptionService, ConfigService],
    }).compile();

    service = module.get<EncryptionService>(EncryptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should encrypt text, someto-api', () => {
    const encriptedtext = service.encryptWithAES256Encription('someto-api');
    Logger.log(encriptedtext);
    expect(encriptedtext).toBeDefined();
  });
});
