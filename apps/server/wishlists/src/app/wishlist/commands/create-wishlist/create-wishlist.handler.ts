import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 } from 'uuid';
import { IWishlist } from '../../models/wishlist.model';
import { Wishlist, WishlistDocument } from '../../schemas/wishlist.schema';
import { PasswordHashService } from '../../services/password-hash/password-hash.service';
import { CreateWishlistCommand } from './create-wishlist.command';

@CommandHandler(CreateWishlistCommand)
export class CreateWishlistCommandHandler
  implements ICommandHandler<CreateWishlistCommand, IWishlist>
{
  constructor(
    @InjectModel(Wishlist.name) private readonly model: Model<WishlistDocument>,
    private readonly passwordHashService: PasswordHashService
  ) {}

  async execute(command: CreateWishlistCommand): Promise<IWishlist> {
    const wishlist = new this.model(command.data);

    wishlist.password = await this.passwordHashService.hash(command.data.password);
    wishlist.token = v4();

    await wishlist.save();

    return wishlist;
  }
}
