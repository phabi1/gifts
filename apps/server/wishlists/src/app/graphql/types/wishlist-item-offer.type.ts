import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class WishlistItemOffer {
    @Field({ nullable: true })
    at: Date;

    @Field({ nullable: true })
    by: string;

    @Field({ nullable: true })
    message?: string;
}