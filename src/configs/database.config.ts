import { ConfigService, registerAs } from '@nestjs/config';

const configService = new ConfigService();

export default registerAs('database', () => ({  // register config map
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
  synchronize: configService.get('node_env') === 'development',
  logging: configService.get('node_env') === 'development',
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
  migrationsTableName: 'migrations',
}));