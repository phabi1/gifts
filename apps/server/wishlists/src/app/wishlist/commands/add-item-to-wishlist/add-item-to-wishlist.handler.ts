import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { IWishlistItem } from "../../models/wishlist-item.model";
import { AddItemToWishlistCommand } from "./add-item-to-wishlist.command";
import { InjectModel } from "@nestjs/mongoose";
import { Wishlist, WishlistDocument } from "../../schemas/wishlist.schema";
import { Model } from "mongoose";
import { WishlistItem } from "../../schemas/wishlist-item.schema";

@CommandHandler(AddItemToWishlistCommand)
export class AddItemToWishlistCommandHandler implements ICommandHandler<AddItemToWishlistCommand, IWishlistItem> {
    constructor(@InjectModel(Wishlist.name) private readonly model: Model<WishlistDocument>) { }

    async execute(command: AddItemToWishlistCommand): Promise<IWishlistItem> {
        const wishlist = await this.model.findById(command.data.wishlistId);
        if (!wishlist) {
            throw new Error("Wishlist not found");
        }
        
        const item = new WishlistItem();
        Object.keys(command.data.data).forEach(key => {
            if (command.data.data[key] !== undefined) {
                item[key] = command.data.data[key];
            }
        });

        wishlist.items.push(item);
        await wishlist.save();
        return wishlist.items[wishlist.items.length - 1];
    }

}