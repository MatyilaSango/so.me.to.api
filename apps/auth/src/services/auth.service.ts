import { Injectable } from '@nestjs/common';
import { CreateLogInDTO } from '@/libs/common/src/dtos/log-in.dto';
import { UserService } from '@/libs/common/src/database/user/services/user.service';
import { users } from '@/libs/common/src/database/user/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly SALT_ROUNDS: number = 10;

  constructor(private userService: UserService) {}

  /**
   * Log users in by finding their accounts.
   *
   * @param {CreateLogInDTO} param - Login credentials.
   * @returns {Promise<users | null>} users
   */
  async login({ username, password }: CreateLogInDTO): Promise<users | null> {
    const users: users[] = await this.userService.findByUsername(username);

    for (const user of users) {
      const isRightUser = await bcrypt.compare(password, user.Password);

      if (!isRightUser) continue;

      delete user.Password;

      if (isRightUser) return user;
    }

    return null;
  }
}
