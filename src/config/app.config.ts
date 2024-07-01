import { IsEnum, IsString } from 'class-validator';
import { Environment } from './types/configurations.enums';

export class ApplicationConfig {
  @IsEnum(Environment, { always: true })
  NODE_ENV: Environment;

  @IsString({ always: true })
  SERVICE_NAME: string;

  @IsString({ always: true })
  HTTP_PORT: string;

  @IsString({ always: true })
  HTTP_HOST: string;

  @IsString({ always: true })
  HTTP_PREFIX: string;

  @IsString({ always: true })
  HTtP_VERSION: string;
}
