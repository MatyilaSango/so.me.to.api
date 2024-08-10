import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createCipheriv, createDecipheriv } from 'node:crypto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncryptionService {
  private key: string;
  private iv: string;
  private algorithm: string;
  private saltRounds: number = 16;

  constructor(private readonly configService: ConfigService) {
    this.key = this.configService.get<string>('keys.encryption.key');
    this.iv = this.configService.get<string>('keys.encryption.iv');
    this.algorithm = this.configService.get<string>('keys.encryption.algorithm');
    this.saltRounds = this.configService.get<number>('keys.saltRounds');
  }

  /**
   * Encrypt data with aes 256 encryption.
   *
   * @param {any} data - Data to encrypt
   * @returns {string} Encripted data
   */
  encryptWithAES256Encription(data: any): string {
    const stringifiedData = JSON.stringify(data);
    const cipher = createCipheriv(this.algorithm, this.key, this.iv);
    return cipher.update(stringifiedData, 'utf8', 'hex') + cipher.final('hex');
  }

  /**
   * Decrypt aes 256 encrypted data.
   *
   * @param {string} encriptedData - Encrypted data
   * @returns {T} Decrypted data
   */
  decryptAES256EncriptedPayload<T>(encriptedData: string): T {
    const decipher = createDecipheriv(this.algorithm, this.key, this.iv);
    return (decipher.update(encriptedData, 'utf8', 'hex') + decipher.final('utf8')) as T;
  }

  /**
   * Hash data with bcrypt.
   *
   * @param {any} data - data to hash
   * @returns {string} Hashed data
   */
  hashPayloadWithBcrypt(data: any): string {
    return bcrypt.hashSync(data, this.saltRounds);
  }

  /**
   * Validate data against hashed data.
   *
   * @param {string} data - Normal plain data
   * @param {string} hashedData - Hashed data
   * @returns {boolean} Whether they the same data
   */
  validateHashedData(data: string, hashedData: string): boolean {
    return bcrypt.compareSync(data, hashedData);
  }
}
