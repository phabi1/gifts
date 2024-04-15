import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IWishlistItem } from "../models/wishlist-item.model";

@Schema()
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
    weight: number;
}

export const WISHLIST_ITEM_SCHEMA = SchemaFactory.createForClass(WishlistItem);