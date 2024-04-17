import { Component, Input, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { OfferFormComponent } from '../offer-form/offer-form.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'gifts-client-portal-pages-wishlist-details-gift-item',
  standalone: true,
  imports: [NgIf, MatButtonModule, MatIconModule],
  templateUrl: './gift-item.component.html',
  styleUrl: './gift-item.component.css',
})
export class GiftItemComponent {
  private _dialog: MatDialog = inject(MatDialog);

  @Input()
  wishlistId = '';

  @Input()
  item: any = {};

  offer() {
    this._dialog.open(OfferFormComponent, {
      data: {
        wishlistId: this.wishlistId,
        item: this.item,
      },
    });
  }
}
