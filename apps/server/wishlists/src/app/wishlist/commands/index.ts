import { AddItemToWishlistCommandHandler } from './add-item-to-wishlist/add-item-to-wishlist.handler';
import { AuthenticateWishlistCommandHandler } from './authenticate-wishlist/authenticate-wishlist.handler';
import { CreateWishlistCommandHandler } from './create-wishlist/create-wishlist.handler';
import { UpdateItemInWishlistCommandHandler } from './update-item-in-wishlist/update-item-in-wishlist.handler';

export const COMMAND_HANDLERS = [
  CreateWishlistCommandHandler,
  AddItemToWishlistCommandHandler,
  UpdateItemInWishlistCommandHandler,
  AuthenticateWishlistCommandHandler,
];
