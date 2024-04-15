import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, ID, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { CreateWishlistCommand } from '../../../wishlist/commands/create-wishlist/create-wishlist.command';
import { GetWishlistQuery } from '../../../wishlist/queries/get-wishlist/get-wishlist.query';
import { CreateWishlistInput } from '../../inputs/create-wishlist.inputs';
import { Wishlist } from '../../types/wishlist.type';
import { WishlistItem } from '../../types/wishlist-item.type';
import { AddItemToWishlistCommand } from '../../../wishlist/commands/add-item-to-wishlist/add-item-to-wishlist.command';
import { WishlistItemInput } from '../../inputs/wishlist-item.input';

@Resolver()
export class WishlistResolver {

    protected readonly pubSub = new PubSub();

    constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) { }

    @Query(() => Wishlist)
    wishlist(@Args('id', { type: () => ID }) id: string): Promise<Wishlist> {
        return this.queryBus.execute(new GetWishlistQuery(id));
    }

    @Mutation(() => Wishlist)
    createWishlist(@Args('input') input: CreateWishlistInput): Promise<Wishlist> {
        return this.commandBus.execute(new CreateWishlistCommand({
            name: input.name,
            title: input.title,
            description: input.description,
            password: input.password
        }));
    }

    @Mutation(() => WishlistItem)
    addItemToWishlist(@Args('wishlistId', { type: () => ID }) wishlistId: string, @Args('item') item: WishlistItemInput): Promise<WishlistItem> {
        return this.commandBus.execute(new AddItemToWishlistCommand({
            wishlistId,
            item
        }));
    }

    @Subscription(() => Wishlist, {
        filter: (payload, variables) => {
            return payload.wishlist === variables.wishlistId;
        }
    })
    itemBooked() {
        return this.pubSub.asyncIterator('itemBooked');
    }
}
