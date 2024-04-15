import { Component, Input } from '@angular/core';
import { GiftItemComponent } from '../gift-item/gift-item.component';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'client-portal-pages-wishlist-details-gift-list',
  standalone: true,
  imports: [NgForOf, NgIf, GiftItemComponent],
  templateUrl: './gift-list.component.html',
  styleUrl: './gift-list.component.css',
})
export class GiftListComponent {

  @Input()
  items: any[] = [];
}
