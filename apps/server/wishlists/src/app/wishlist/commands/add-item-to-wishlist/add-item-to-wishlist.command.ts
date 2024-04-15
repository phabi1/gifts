import { ICommand } from "@nestjs/cqrs";

export class AddItemToWishlistCommand implements ICommand {
    constructor(public readonly data: { wishlistId: string, item: any }) { }
}