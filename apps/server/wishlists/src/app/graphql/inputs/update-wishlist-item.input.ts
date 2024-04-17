import { InputType, PartialType } from '@nestjs/graphql';
import { CreateWishlistItemInput } from './create-wishlist-item.input';

@InputType()
export class UpdateWishlistItemInput extends PartialType(
  CreateWishlistItemInput
) {}
