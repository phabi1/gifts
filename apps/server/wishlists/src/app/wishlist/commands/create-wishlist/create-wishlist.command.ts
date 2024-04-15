import { ICommand } from "@nestjs/cqrs";

export class CreateWishlistCommand implements ICommand {
    constructor(public readonly data: {
        name: string,
        title: string,
        description: string,
        password: string
    }) { }
}