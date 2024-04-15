import { NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { Subscription, distinctUntilChanged, map, switchMap } from 'rxjs';
import { GiftListComponent } from '../../components/gift-list/gift-list.component';

@Component({
  selector: 'client-portal-pages-wishlist-details',
  standalone: true,
  imports: [NgIf, GiftListComponent],
  templateUrl: './client-portal-pages-wishlist-details.component.html',
  styleUrl: './client-portal-pages-wishlist-details.component.css',
})
export class ClientPortalPagesWishlistDetailsComponent implements OnInit {
  private _apollo: Apollo = inject(Apollo);
  private _route: ActivatedRoute = inject(ActivatedRoute);

  public wishlist: any = null;

  ngOnInit(): void {

    const source$ = this._route.params
      .pipe(
        map((params) => params['wishlist']),
        distinctUntilChanged(),
      );


    source$.pipe(
      switchMap((wishlistId) =>
        this._apollo
          .query<{ wishlist: any }>(
            {
              query: gql`
          query ($wishlistId: ID!) {
            wishlist(id: $wishlistId) {
              id
              title
              items {
                id
                title
                imageUrl
              }
            }
          }
        `,
              variables: { wishlistId }
            },)
      )
    )
      .subscribe((result) => {
        this.wishlist = result.data.wishlist;
      });

    let subscription: Subscription;
    source$.subscribe((wishlistId) => {
      if (subscription) {
        subscription.unsubscribe();
      }
      subscription = this._apollo.subscribe<any>({
        query: gql`
        subscription {
          wishlistUpdated (id: $wishlistId) {
            id
            title
            items {
              id
              title
            }
          }
        }
      `,
        variables: { wishlistId }
      }).subscribe((result) => {
        this.wishlist = result.data.wishlistUpdated;
      });
    });
  }
}
