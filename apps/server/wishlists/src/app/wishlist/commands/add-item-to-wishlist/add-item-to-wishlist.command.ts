import { ICommand } from '@nestjs/cqrs';

export class AddItemToWishlistCommand implements ICommand {
  constructor(
    public readonly data: {
      wishlistId: string;
      data: {
        title: string;
        description: string;
        price: number;
        imageUrl: string;
        url: string;
        priority?: number;
      };
    }
  ) {}
}
