import { ICommand } from "@nestjs/cqrs";

export class AuthenticateWishlistCommand implements ICommand {
  constructor(public readonly wishlist: string, public readonly password: string) {}
}