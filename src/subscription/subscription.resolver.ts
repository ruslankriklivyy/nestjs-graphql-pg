import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { NewSubscriptionInput } from './dto/new-subscription.input';
import { UpdateSubscriptionInput } from './dto/update-subscription.input';
import { SubscriptionArgs, SubscriptionsArgs } from './dto/subscriptions.args';
import { DeletedCount, Subscription } from './models/subscription.model';
import { SubscriptionService } from './subscription.service';
import { DeleteSubscriptionInput } from './dto/delete-subscription.input';

const pubSub = new PubSub();

@Resolver()
export class SubscriptionResolver {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Query(() => [Subscription])
  subscriptions(
    @Args() subscriptionsArgs: SubscriptionsArgs,
  ): Promise<Subscription[]> {
    return this.subscriptionService.findAll();
  }

  @Query(() => Subscription)
  subscription(
    @Args() subscriptionArgs: SubscriptionArgs,
  ): Promise<Subscription> {
    return this.subscriptionService.findOne(subscriptionArgs.id);
  }

  @Mutation(() => Subscription)
  async addSubscription(
    @Args('newSubscriptionInput') newSubscriptionInput: NewSubscriptionInput,
  ): Promise<Subscription> {
    const subscription = await this.subscriptionService.createOne(
      newSubscriptionInput,
    );
    pubSub.publish('subscriptionAdded', { subscriptionAdded: subscription });

    return subscription;
  }

  @Mutation(() => Subscription)
  async updateSubscription(
    @Args('updateSubscriptionInput')
    updateSubscriptionInput: UpdateSubscriptionInput,
  ) {
    const { id, update } = updateSubscriptionInput;
    const subscription = await this.subscriptionService.updateOne(id, update);
    pubSub.publish('subscriptionUpdated', {
      subscriptionUpdated: subscription,
    });

    return subscription;
  }

  @Mutation(() => DeletedCount)
  async deleteSubscription(
    @Args('deleteSubscriptionInput')
    deleteSubscriptionInput: DeleteSubscriptionInput,
  ) {
    const { id } = deleteSubscriptionInput;
    return this.subscriptionService.deleteOne(id);
  }
}
