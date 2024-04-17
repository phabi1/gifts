import { ICommand } from '@nestjs/cqrs';

export class OfferItemCommand implements ICommand {
  constructor(
    public readonly data: {
      wishlistId: string;
      itemId: string;
      name: string;
      message?: string;
    }
  ) {}
}
