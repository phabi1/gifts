import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IWishlist } from "../../models/wishlist.model";
import { Wishlist, WishlistDocument } from "../../schemas/wishlist.schema";
import { CreateWishlistCommand } from "./create-wishlist.command";

@CommandHandler(CreateWishlistCommand)
export class CreateWishlistCommandHandler implements ICommandHandler<CreateWishlistCommand, IWishlist> {

constructor (@InjectModel(Wishlist.name) private readonly model: Model<WishlistDocument>) {}

    execute(command: CreateWishlistCommand): Promise<IWishlist> {
        const wishlist = new this.model(command.data);
        return wishlist.save();
    }

}