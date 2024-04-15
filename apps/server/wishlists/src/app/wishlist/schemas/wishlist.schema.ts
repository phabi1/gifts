import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { IWishlistItem } from "../models/wishlist-item.model";
import { IWishlist } from "../models/wishlist.model";
import { WISHLIST_ITEM_SCHEMA } from "./wishlist-item.schema";

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
    items: IWishlistItem[];
    @Prop()
    password: string;
}

export const WISHLIST_SCHEMA = SchemaFactory.createForClass(Wishlist);