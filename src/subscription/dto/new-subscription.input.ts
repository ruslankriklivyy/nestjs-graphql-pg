import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class NewSubscriptionInput {
  @Field()
  @MinLength(3)
  title: string;

  @Field()
  price: number;

  @Field()
  @MinLength(3)
  hexColor: string;
}
