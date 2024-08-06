import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private UserRepository: Repository<User>,
  ) {}

  /**
   * Find all User in the User table.
   *
   * @returns {Promise<User[]>} User
   */
  findAll(): Promise<User[]> {
    return this.UserRepository.find();
  }

  /**
   * Find User by username.
   *
   * @param Username - Username
   * @returns {Promise<User[]>} User
   */
  findByUsername(Username: string): Promise<User[]> {
    return this.UserRepository.findBy({ Username });
  }

  /**
   * Find user by uid.
   *
   * @param Uid - User's uid
   * @returns {Promise<User>} User
   */
  findByUid(Uuid: string): Promise<User> {
    return this.UserRepository.findOneBy({ Uuid });
  }
}
