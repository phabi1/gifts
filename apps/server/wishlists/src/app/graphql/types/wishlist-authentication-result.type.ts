import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class WishlistAuthenticationResult {
    @Field(() => Boolean)
    logged: boolean;

    @Field(() => String, { nullable: true })
    token?: string;
}