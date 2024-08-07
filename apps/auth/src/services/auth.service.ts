import { Injectable } from '@nestjs/common';
import { CreateLogInDTO } from '@/libs/common/src/dtos/log-in.dto';
import { UserDatabaseService } from '@/libs/common/src/database/user/services/user.database.service';
import { User } from '@/libs/common/src/database/user/entities/user.entity';
import { CreateFullUserDto } from '@/libs/common/src/dtos/user.dto';
import { CreatePostUserDto } from '@/libs/common/src/dtos/sign-up.dto';
import { EncryptionService } from '@/libs/common/src/encryption/encryption.service';

@Injectable()
export class AuthService {
  constructor(
    private userDatabaseService: UserDatabaseService,
    private readonly encryptionService: EncryptionService,
  ) {}

  /**
   * Log User in by finding their accounts.
   *
   * @param {CreateLogInDTO} param - Login credentials.
   * @returns {Promise<User | null>} user
   */
  async loginByUsernameAndPassword({
    Username,
    Password,
  }: CreateLogInDTO): Promise<User | null> {
    const User: User[] =
      await this.userDatabaseService.findByUsername(Username);

    for (const user of User) {
      const isRightUser = this.encryptionService.validateHashedData(
        Password,
        user.Password,
      );

      if (!isRightUser) continue;

      return this.prepareUserForDelivery(user);
    }

    return null;
  }

  /**
   * Get user by Uuid.
   *
   * @param {CreateFullUserDto} Uuid - User's uuid
   * @returns {Promise<User | null>} user
   */
  async getUserByUid({ Uuid }: CreateFullUserDto): Promise<User | null> {
    const user: User = await this.userDatabaseService.findByUuid(Uuid);

    if (!user) return null;

    return this.prepareUserForDelivery(user);
  }

  /**
   * Post user in database.
   *
   * @param {CreatePostUserDto} post - User details
   * @returns {Promise<boolean>} If user add successfully
   */
  async postUser(post: CreatePostUserDto): Promise<boolean> {
    const password = this.encryptionService.hashPayloadWithBcrypt(
      post.Password,
    );

    const user: User = await this.userDatabaseService.save({
      ...post,
      Password: password,
    });

    if (!user) return false;

    return true;
  }

  /**
   * Prepare user for delivery.
   *
   * @param user - User object,
   * @returns {User} user
   */
  prepareUserForDelivery(user: User): User {
    delete user.Password;

    return user;
  }
}
