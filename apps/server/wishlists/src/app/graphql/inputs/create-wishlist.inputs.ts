import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateWishlistInput {
    @Field()
    name: string;

    @Field()
    title: string;

    @Field({ nullable: true })
    description: string;

    @Field()
    password: string;
}