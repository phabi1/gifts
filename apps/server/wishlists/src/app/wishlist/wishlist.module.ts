import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { COMMAND_HANDLERS } from './commands';
import { QUERY_HANDLERS } from './queries';
import { WISHLIST_SCHEMA, Wishlist } from './schemas/wishlist.schema';
import { PasswordHashService } from './services/password-hash/password-hash.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Wishlist.name, schema: WISHLIST_SCHEMA },
    ]),
  ],
  providers: [...COMMAND_HANDLERS, ...QUERY_HANDLERS, PasswordHashService],
})
export class WishlistModule {}
