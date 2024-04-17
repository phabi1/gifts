import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { IWishlist } from "../models/wishlist.model";
import { WISHLIST_ITEM_SCHEMA, WishlistItem } from "./wishlist-item.schema";

export type WishlistDocument = Wishlist & Document;

@Schema({timestamps: true, toJSON: {virtuals: true}})
export class Wishlist implements IWishlist {
    id: string;
    @Prop({required: true, unique: true})
    name: string;
    @Prop({required: true})
    title: string;
    @Prop()
    description: string;
    @Prop({type: [WISHLIST_ITEM_SCHEMA], default: []})
    items: WishlistItem[];
    @Prop()
    password: string;
    @Prop({required: true})
    token: string;
}

export const WISHLIST_SCHEMA = SchemaFactory.createForClass(Wishlist);