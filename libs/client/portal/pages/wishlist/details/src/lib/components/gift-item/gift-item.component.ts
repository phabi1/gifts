import { Component, Input, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'client-portal-pages-wishlist-details-gift-item',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './gift-item.component.html',
  styleUrl: './gift-item.component.css',
})
export class GiftItemComponent {

  private _apollo: Apollo = inject(Apollo);

  @Input()
  item: any = {}

  buy() {
    this._apollo.mutate({
      mutation: gql`
        mutation BuyGift($id: ID!) {
          buyGift(id: $id) {
            id
            name
            description
            price
            isBought
          }
        }
      `,
      variables: {
        id: this.item.id
      }
    }).subscribe();
  }
}
