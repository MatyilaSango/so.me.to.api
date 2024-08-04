import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { users } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private UserRepository: Repository<users>,
  ) {}

  /**
   * Find all users in the users table.
   *
   * @returns {Promise<users[]>} Users
   */
  findAll(): Promise<users[]> {
    return this.UserRepository.find();
  }

  /**
   * Find users by username.
   *
   * @param Username - Username
   * @returns {Promise<users[]>} Users
   */
  findByUsername(Username: string): Promise<users[]> {
    return this.UserRepository.findBy({ Username });
  }

  /**
   * Find user by uid.
   *
   * @param Uid - User's uid
   * @returns {Promise<users>} User
   */
  findByUid(Uid: string): Promise<users> {
    return this.UserRepository.findOneBy({ Uid });
  }
}
