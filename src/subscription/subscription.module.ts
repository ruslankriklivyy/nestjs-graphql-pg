import { Module } from '@nestjs/common';

import { SubscriptionService } from './subscription.service';
import { SubscriptionResolver } from './subscription.resolver';
import { DatabaseModule } from '../database/database.module';
import { subscriptionsProviders } from './subscription.providers';

@Module({
  imports: [DatabaseModule],
  providers: [
    SubscriptionService,
    SubscriptionResolver,
    ...subscriptionsProviders,
  ],
})
export class SubscriptionModule {}
