import { Injectable } from '@nestjs/common';
import { CreateLogInDTO } from '@/libs/common/src/dtos/log-in.dto';
import { UserDatabaseService } from '@/libs/common/src/database/user/services/user.database.service';
import { User } from '@/libs/common/src/database/user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateFullUserDto } from '@/libs/common/src/dtos/user.dto';
import { CreatePostUserDto } from '@/libs/common/src/dtos/sign-up.dto';

@Injectable()
export class AuthService {
  private readonly SALT_ROUNDS: number = 10;

  constructor(private userDatabaseService: UserDatabaseService) {}

  /**
   * Log User in by finding their accounts.
   *
   * @param {CreateLogInDTO} param - Login credentials.
   * @returns {Promise<User | null>} user
   */
  async loginByUsernameAndPassword({
    username,
    password,
  }: CreateLogInDTO): Promise<User | null> {
    const User: User[] =
      await this.userDatabaseService.findByUsername(username);

    for (const user of User) {
      const isRightUser = await bcrypt.compare(password, user.Password);

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
    const user: User = await this.userDatabaseService.save(post);

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
