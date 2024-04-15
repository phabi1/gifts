import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { COMMAND_HANDLERS } from './commands';
import { QUERY_HANDLERS } from './queries';
import { WISHLIST_SCHEMA, Wishlist } from './schemas/wishlist.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{name: Wishlist.name, schema: WISHLIST_SCHEMA}])
    ],
    providers: [...COMMAND_HANDLERS, ...QUERY_HANDLERS]
})
export class WishlistModule { }
