import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateItemInWishlistCommand } from './update-item-in-wishlist.command';
import { IWishlistItem } from '../../models/wishlist-item.model';
import { InjectModel } from '@nestjs/mongoose';
import { Wishlist, WishlistDocument } from '../../schemas/wishlist.schema';
import { Model } from 'mongoose';

@CommandHandler(UpdateItemInWishlistCommand)
export class UpdateItemInWishlistCommandHandler
  implements ICommandHandler<UpdateItemInWishlistCommand, IWishlistItem>
{
  constructor(
    @InjectModel(Wishlist.name) private readonly model: Model<WishlistDocument>
  ) {}

  async execute(command: UpdateItemInWishlistCommand): Promise<IWishlistItem> {
    const wishlist = await this.model.findById(command.data.wishlistId).exec();

    if (!wishlist) {
      throw new Error('Wishlist not found');
    }

    const item = wishlist.items.find((item) => item.id === command.data.itemId);
    if (!item) {
      throw new Error('Item not found in wishlist');
    }

    console.log(command.data.data);
    Object.keys(command.data.data).forEach((key) => {
      if (command.data.data[key] !== undefined) {
        item[key] = command.data.data[key];
      }
    });

    await wishlist.save();

    return item;
  }
}
