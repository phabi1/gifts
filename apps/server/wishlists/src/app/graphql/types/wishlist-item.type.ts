import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IWishlistItem } from '../../wishlist/models/wishlist-item.model';
import { WishlistItemOffer } from './wishlist-item-offer.type';

@ObjectType('WishlistItem')
export class WishlistItem implements IWishlistItem {
  @Field(() => ID)
  id: string;
  @Field()
  title: string;
  @Field({ nullable: true })
  description: string;
  @Field()
  price: number;
  @Field({ nullable: true })
  url: string;
  @Field({ nullable: true })
  imageUrl: string;
  @Field()
  priority: number;
  @Field(() => WishlistItemOffer)
  offer: WishlistItemOffer;
}
