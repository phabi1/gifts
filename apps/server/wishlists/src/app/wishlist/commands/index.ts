import { AddItemToWishlistCommandHandler } from "./add-item-to-wishlist/add-item-to-wishlist.handler";
import { CreateWishlistCommandHandler } from "./create-wishlist/create-wishlist.handler";

export const COMMAND_HANDLERS = [CreateWishlistCommandHandler, AddItemToWishlistCommandHandler];