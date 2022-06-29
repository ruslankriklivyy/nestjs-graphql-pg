import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateSubscription {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  price?: number;

  @Field({ nullable: true })
  hexColor?: string;
}

@InputType()
export class UpdateSubscriptionInput {
  @Field()
  id: string;

  @Field(() => UpdateSubscription)
  update: UpdateSubscription;
}
