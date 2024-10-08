import { Injectable } from '@nestjs/common';
import { CreateLogInDto } from '@/libs/common/src/dtos/log-in.dto';
import { UserDatabaseService } from '@/libs/common/src/database/user/services/user.database.service';
import { User } from '@/libs/common/src/database/user/entities/user.entity';
import { CreatePostUserDto } from '@/libs/common/src/dtos/sign-up.dto';
import { EncryptionService } from '@/libs/common/src/encryption/encryption.service';
import { IAuthUser } from '@/libs/common/src';

@Injectable()
export class AuthService {
  constructor(
    private userDatabaseService: UserDatabaseService,
    private readonly encryptionService: EncryptionService,
  ) {}

  /**
   * Log user in by finding account.
   *
   * @param {CreateLogInDto} param - Login credentials.
   * @returns {Promise<IAuthUser | null>} User payload
   */
  async loginByUsernameAndPassword({ Username, Password }: CreateLogInDto): Promise<IAuthUser | null> {
    const User: User[] = await this.userDatabaseService.findByUsername(Username);

    for (const user of User) {
      const isRightUser = this.encryptionService.validateHashedData(Password, user.Password);

      if (!isRightUser) continue;

      return { Uuid: user.Uuid, Role: user.Role };
    }

    return null;
  }

  /**
   * Post user in database.
   *
   * @param {CreatePostUserDto} post - User details
   * @returns {Promise<boolean>} If user add successfully
   */
  async postUser(post: CreatePostUserDto): Promise<boolean> {
    const password = this.encryptionService.hashPayloadWithBcrypt(post.Password);

    const user: User = await this.userDatabaseService.save({
      ...post,
      Password: password,
    });

    if (!user) return false;

    return true;
  }
}
