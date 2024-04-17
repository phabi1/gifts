import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IWishlistItem } from '../../models/wishlist-item.model';
import { Wishlist, WishlistDocument } from '../../schemas/wishlist.schema';
import { OfferItemCommand } from './offer-item.command';

@CommandHandler(OfferItemCommand)
export class OfferItemCommandHandler
  implements ICommandHandler<OfferItemCommand, IWishlistItem>
{
  constructor(
    @InjectModel(Wishlist.name) private readonly model: Model<WishlistDocument>
  ) {}

  async execute(command: OfferItemCommand): Promise<IWishlistItem> {
    const wishlist = await this.model.findById(command.data.wishlistId);
    if (!wishlist) {
      throw new Error('Wishlist not found');
    }
    const item = wishlist.items.find((i) => i.id === command.data.itemId);
    if (!item) {
      throw new Error('Item not found in wishlist');
    }

    if (!item.offer) {
        item.offer = {
            at: null,
            by: null,
            message: null
        };
    }

    if (item.offer.at) {
      throw new Error('Item already has an offer');
    }

    item.offer.at = new Date();
    item.offer.by = command.data.name;
    item.offer.message = command.data.message || '';

    await wishlist.save();

    return item;
  }
}
