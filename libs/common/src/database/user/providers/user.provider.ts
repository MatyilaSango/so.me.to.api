import { DataSource } from 'typeorm';
import { users } from '../entities/user.entity';

export const userProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(users),
    inject: ['DATA_SOURCE'],
  },
];
