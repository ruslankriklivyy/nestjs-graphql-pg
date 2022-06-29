import { SubscriptionEntity } from './subscription.entity';

export const subscriptionsProviders = [
  {
    provide: 'SUBSCRIPTIONS_REPOSITORY',
    useValue: SubscriptionEntity,
  },
];
