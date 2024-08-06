import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreatePostUserDto } from '../../../dtos/sign-up.dto';

@Injectable()
export class UserDatabaseService {
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
  findByUuid(Uuid: string): Promise<User> {
    return this.UserRepository.findOneBy({ Uuid });
  }

  async save(post: CreatePostUserDto): Promise<User> {
    const uuid = uuidv4();

    // if (!isUUID(uuid)) return this.save(post);

    // const user = await this.findByUuid(uuid);

    // if (user) return this.save(post);

    const user: User = { Uuid: uuid, ...(post as User) };

    return this.UserRepository.save<User>(user);
  }
}
