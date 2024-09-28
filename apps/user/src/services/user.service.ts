import { EncryptionService, User, UserDatabaseService } from '@/libs/common/src';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    private userDatabaseService: UserDatabaseService,
    private readonly encryptionService: EncryptionService,
  ) {}

  /**
   * Get user by Uuid.
   *
   * @param {string} Uuid - User's uuid
   * @returns {Promise<User | null>} user
   * This needs to be moved to user microservice.
   */
  async getUserByUid(Uuid: string): Promise<User | null> {
    const user: User = await this.userDatabaseService.findByUuid(Uuid);

    if (!user) return null;

    return user;
  }
}
