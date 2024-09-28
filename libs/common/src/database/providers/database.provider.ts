/* eslint-disable @typescript-eslint/ban-types */
import { DataSource, EntitySchema } from 'typeorm';
import { ConfigService } from '@nestjs/config';

/**
 * Database provider.
 *
 * @param {string | Function | EntitySchema<any>} entity - Database entity
 * @returns data source
 */
export const databaseProvider = (entity: string | Function | EntitySchema<any>) => ({
  provide: 'DATA_SOURCE',
  useFactory: async (configService: ConfigService) => {
    const dataSource = new DataSource({
      type: 'postgres',
      host: configService.get('database.host'),
      port: configService.get('database.port'),
      username: configService.get('database.username'),
      password: configService.get('database.password'),
      database: configService.get('database.database'),
      entities: [entity],
      synchronize: true,
    });

    return dataSource.initialize();
  },
  inject: [ConfigService],
});
