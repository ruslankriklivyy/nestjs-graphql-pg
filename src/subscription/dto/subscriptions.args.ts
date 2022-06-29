import { ArgsType, Field, ID, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';

@ArgsType()
export class SubscriptionsArgs {
  @Field((type) => Int)
  @Min(0)
  limit = 0;
}

@ArgsType()
export class SubscriptionArgs {
  @Field(() => ID)
  id?: string;
}
