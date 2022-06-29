import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteSubscriptionInput {
  @Field()
  id: string;
}
