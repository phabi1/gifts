import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
    Args,
    ID,
    Mutation,
    Query,
    Resolver,
    Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { AddItemToWishlistCommand } from '../../../wishlist/commands/add-item-to-wishlist/add-item-to-wishlist.command';
import { AuthenticateWishlistCommand } from '../../../wishlist/commands/authenticate-wishlist/authenticate-wishlist.command';
import { CreateWishlistCommand } from '../../../wishlist/commands/create-wishlist/create-wishlist.command';
import { UpdateItemInWishlistCommand } from '../../../wishlist/commands/update-item-in-wishlist/update-item-in-wishlist.command';
import { GetWishlistQuery } from '../../../wishlist/queries/get-wishlist/get-wishlist.query';
import { CreateWishlistItemInput } from '../../inputs/create-wishlist-item.input';
import { CreateWishlistInput } from '../../inputs/create-wishlist.inputs';
import { UpdateWishlistItemInput } from '../../inputs/update-wishlist-item.input';
import { WishlistAuthenticationResult } from '../../types/wishlist-authentication-result.type';
import { WishlistItem } from '../../types/wishlist-item.type';
import { Wishlist } from '../../types/wishlist.type';

@Resolver()
export class WishlistResolver {
  protected readonly pubSub = new PubSub();

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Query(() => Wishlist)
  wishlist(@Args('id', { type: () => ID }) id: string): Promise<Wishlist> {
    return this.queryBus.execute(new GetWishlistQuery(id));
  }

  @Mutation(() => Wishlist)
  createWishlist(@Args('input') input: CreateWishlistInput): Promise<Wishlist> {
    return this.commandBus.execute(
      new CreateWishlistCommand({
        name: input.name,
        title: input.title,
        description: input.description,
        password: input.password,
      })
    );
  }

  @Mutation(() => WishlistItem)
  addItemToWishlist(
    @Args('wishlistId', { type: () => ID }) wishlistId: string,
    @Args('input') input: CreateWishlistItemInput
  ): Promise<WishlistItem> {
    return this.commandBus.execute(
      new AddItemToWishlistCommand({
        wishlistId,
        data: input,
      })
    );
  }

  @Mutation(() => WishlistItem)
  updateItemInWishlist(
    @Args('wishlistId', { type: () => ID }) wishlistId: string,
    @Args('itemId', { type: () => ID }) itemId: string,
    @Args('input') input: UpdateWishlistItemInput
  ): Promise<WishlistItem> {
    return this.commandBus.execute(
      new UpdateItemInWishlistCommand({
        wishlistId,
        itemId,
        data: input,
      })
    );
  }

  @Mutation(() => WishlistAuthenticationResult)
  async authenticateWishlist(
    @Args('wishlist', { type: () => ID }) wishlist: string,
    @Args('password', { type: () => String }) password: string
  ): Promise<WishlistAuthenticationResult> {
    return this.commandBus.execute(
      new AuthenticateWishlistCommand(wishlist, password)
    );
  }

  @Subscription(() => Wishlist, {
    filter: (payload, variables) => {
      return payload.wishlist === variables.wishlistId;
    },
  })
  itemBooked() {
    return this.pubSub.asyncIterator('itemBooked');
  }
}
