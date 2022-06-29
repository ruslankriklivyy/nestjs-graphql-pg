import { ArgsType, Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Subscription {
  @Field(() => ID)
  id?: string;

  @Field()
  title?: string;

  @Field()
  price?: number;

  @Field()
  hexColor?: string;
}

@ObjectType()
export class DeletedCount {
  @Field(() => Int)
  deletedCount?: number;
}
