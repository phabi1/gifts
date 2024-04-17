import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateWishlistItemInput {
    @Field()
    title: string;

    @Field({nullable: true})
    description: string;

    @Field()
    price: number;

    @Field({nullable: true})
    url: string;

    @Field()
    imageUrl: string;

    @Field({nullable: true})
    weight: number;
}