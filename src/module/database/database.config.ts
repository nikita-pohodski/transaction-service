import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PostgresConnectionCredentialsOptions } from 'typeorm/driver/postgres/PostgresConnectionCredentialsOptions';
import migrations from './migrations';

export const databaseOptions = (
  config: ConfigService,
): TypeOrmModuleOptions & PostgresConnectionCredentialsOptions => {
  return {
    type: <any>config.get('DB_TYPE'),
    host: config.get('DB_HOST'),
    port: Number(config.get('DB_PORT')),
    username: config.get('DB_USERNAME'),
    password: config.get('DB_PASSWORD'),
    database: config.get('DB_DATABASE'),
    logging: config.get('DB_LOGGING') == true,
    synchronize: false,
    migrationsRun: config.get('DB_MIGRATIONS_RUN') == true,
    migrationsTableName: config.get('DB_MIGRATIONS_TABLE_NAME'),
    migrations,
    autoLoadEntities: true,
  };
};
