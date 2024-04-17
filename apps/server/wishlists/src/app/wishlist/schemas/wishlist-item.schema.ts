import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IWishlistItem } from '../models/wishlist-item.model';
import { OFFER_SCHEMA, Offer } from './offer.schema';

@Schema({ timestamps: true, toJSON: { virtuals: true } })
export class WishlistItem implements IWishlistItem {
  id: string;
  @Prop({ required: true })
  title: string;
  @Prop()
  description: string;
  @Prop()
  price: number;
  @Prop()
  url: string;
  @Prop()
  imageUrl: string;
  @Prop({ default: 0 })
  priority: number;
  @Prop({ type: OFFER_SCHEMA, default: { at: null } })
  offer: Offer;
}

export const WISHLIST_ITEM_SCHEMA = SchemaFactory.createForClass(WishlistItem);
