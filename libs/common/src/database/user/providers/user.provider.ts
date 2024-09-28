import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import { databaseProvider } from '../../providers/database.provider';

export const userProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];

export const userDataSoure = [databaseProvider(User)];
