import { Field, ID, ObjectType } from "@nestjs/graphql";
import { IWishlist } from "../../wishlist/models/wishlist.model";
import { WishlistItem } from "./wishlist-item.type";

@ObjectType('Wishlist')
export class Wishlist implements IWishlist {
    @Field(() => ID)
    id: string;
    @Field()
    name: string;
    @Field()
    title: string;
    @Field({nullable: true})
    description: string;
    @Field(() => [WishlistItem], { nullable: 'items'})
    items: WishlistItem[];
}