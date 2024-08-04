import { Injectable } from '@nestjs/common';
import { CreateLogInDTO } from '@/libs/common/src/dtos/log-in.dto';
import { UserService } from '@/libs/common/src/database/user/services/user.service';
import { users } from '@/libs/common/src/database/user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateFullUserDto } from '@/libs/common/src/dtos/user.dto';

@Injectable()
export class AuthService {
  private readonly SALT_ROUNDS: number = 10;

  constructor(private userService: UserService) {}

  /**
   * Log users in by finding their accounts.
   *
   * @param {CreateLogInDTO} param - Login credentials.
   * @returns {Promise<users | null>} user
   */
  async loginByUsernameAndPassword({
    username,
    password,
  }: CreateLogInDTO): Promise<users | null> {
    const users: users[] = await this.userService.findByUsername(username);

    for (const user of users) {
      const isRightUser = await bcrypt.compare(password, user.Password);

      if (!isRightUser) continue;

      return this.prepareUserForDelivery(user);
    }

    return null;
  }

  /**
   * Get user by Uid.
   *
   * @param {CreateFullUserDto} Uid - User's uid
   * @returns {users} user
   */
  async getUserByUid({ Uid }: CreateFullUserDto): Promise<users | null> {
    const user: users = await this.userService.findByUid(Uid);

    if (!user) return null;

    return this.prepareUserForDelivery(user);
  }

  /**
   * Prepare user for delivery.
   *
   * @param user - User object,
   * @returns {users} user
   */
  prepareUserForDelivery(user: users): users {
    delete user.Password;

    return user;
  }
}
