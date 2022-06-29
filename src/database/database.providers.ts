import { Sequelize } from 'sequelize-typescript';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { SubscriptionEntity } from '../subscription/subscription.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: +configService.get<string>('POSTGRES_PORT'),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DATABASE'),
      });
      sequelize.addModels([SubscriptionEntity]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
