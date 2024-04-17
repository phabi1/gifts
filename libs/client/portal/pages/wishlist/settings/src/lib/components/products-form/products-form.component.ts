import { NgForOf, NgIf } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'gifts-client-portal-pages-wishlist-settings-products-form',
  standalone: true,
  imports: [NgIf, NgForOf, MatButtonModule, MatDialogModule, MatIconModule],
  templateUrl: './products-form.component.html',
  styleUrl: './products-form.component.css',
})
export class ProductsFormComponent implements OnInit, OnChanges {
  private _dialog: MatDialog = inject(MatDialog);

  @Input() wishlist: any;

  items: any[] = [];

  ngOnInit(): void {
    this.items = [...this.wishlist.items];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('wishlist' in changes) {
      this.items = [...this.wishlist.items];
    }
  }

  addItem() {
    const dialogRef = this._dialog.open(ProductFormComponent, {
      data: {
        item: null,
        wishlist: this.wishlist.id,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.items.push(result);
      }
    });
  }

  editItem(item: any) {
    const index = this.items.findIndex((i) => i.id === item.id);
    if (index === -1) {
      return;
    }
    const dialogRef = this._dialog.open(ProductFormComponent, {
      data: {
        item,
        wishlist: this.wishlist.id,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.items[index] = result;
      }
    });
  }

  removeItem(item: any) {
    const index = this.items.findIndex((i) => i.id === item.id);
    if (index === -1) {
      return;
    }
    this.items.splice(index, 1);
  }
}
