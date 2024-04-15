import { IWishlistItem } from "./wishlist-item.model";

export interface IWishlist {
    id: string;
    name: string;
    title: string;
    description: string;
    items: IWishlistItem[];
}