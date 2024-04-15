import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { WishlistResolver } from './resolvers/wishlist/wishlist.resolver';
import { join } from 'path';

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            subscriptions: {
                'graphql-ws': true
            },
        }),
    ],
    providers: [WishlistResolver]
})
export class GraphqlModule { }
