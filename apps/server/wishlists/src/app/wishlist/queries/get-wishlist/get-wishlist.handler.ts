import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetWishlistQuery } from "./get-wishlist.query";
import { IWishlist } from "../../models/wishlist.model";
import { InjectModel } from "@nestjs/mongoose";
import { Wishlist, WishlistDocument } from "../../schemas/wishlist.schema";
import { Model, Types } from "mongoose";

@QueryHandler(GetWishlistQuery)
export class GetWishlistQueryHandler implements IQueryHandler<GetWishlistQuery, IWishlist> {

    constructor(@InjectModel(Wishlist.name) private readonly model: Model<WishlistDocument>) { }

    async execute(query: GetWishlistQuery): Promise<IWishlist> {
        if (Types.ObjectId.isValid(query.id) === false) {
            return this.model.findOne({ name: query.id }).exec();
        } else {
            return this.model.findById(query.id).exec();
        }
    }
}