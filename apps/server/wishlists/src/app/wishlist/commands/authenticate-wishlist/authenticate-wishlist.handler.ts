import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuthenticateWishlistCommand } from './authenticate-wishlist.command';
import { Wishlist, WishlistDocument } from '../../schemas/wishlist.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PasswordHashService } from '../../services/password-hash/password-hash.service';

@CommandHandler(AuthenticateWishlistCommand)
export class AuthenticateWishlistCommandHandler
  implements
    ICommandHandler<
      AuthenticateWishlistCommand,
      { logged: boolean; token: string }
    >
{
  constructor(
    @InjectModel(Wishlist.name) private readonly model: Model<WishlistDocument>,
    private readonly passwordHashService: PasswordHashService
  ) {}

  async execute(
    command: AuthenticateWishlistCommand
  ): Promise<{ logged: boolean; token: string }> {
    let wishlist;
    if (Types.ObjectId.isValid(command.wishlist)) {
      wishlist = await this.model.findById(command.wishlist).exec();
    } else {
      wishlist = await this.model.findOne({ name: command.wishlist }).exec();
    }

    if (!wishlist) {
      return { logged: false, token: null };
    }

    if (await this.passwordHashService.compare(command.password, wishlist.password)) {
      return { logged: true, token: 'token' };
    }

    return { logged: false, token: null };
  }
}
