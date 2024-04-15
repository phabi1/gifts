import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { IWishlistItem } from "../../models/wishlist-item.model";
import { AddItemToWishlistCommand } from "./add-item-to-wishlist.command";
import { InjectModel } from "@nestjs/mongoose";
import { Wishlist, WishlistDocument } from "../../schemas/wishlist.schema";
import { Model } from "mongoose";

@CommandHandler(AddItemToWishlistCommand)
export class AddItemToWishlistCommandHandler implements ICommandHandler<AddItemToWishlistCommand, IWishlistItem> {
    constructor(@InjectModel(Wishlist.name) private readonly model: Model<WishlistDocument>) { }

    async execute(command: AddItemToWishlistCommand): Promise<IWishlistItem> {
        const wishlist = await this.model.findById(command.data.wishlistId);
        wishlist.items.push(command.data.item);
        await wishlist.save();
        return wishlist.items[wishlist.items.length - 1];
    }

}