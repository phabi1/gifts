import { ICommand } from '@nestjs/cqrs';

export class UpdateItemInWishlistCommand implements ICommand {
  constructor(
    public readonly data: {
      wishlistId: string;
      itemId: string;
      data: {
        title?: string;
        description?: string;
        price?: number;
        imageUrl?: string;
        url?: string;
        priority?: number;
      };
    }
  ) {}
}
