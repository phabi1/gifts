import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { Apollo, gql } from 'apollo-angular';

interface ProductData {
  title: string;
  description: string;
  price: number;
  url: string;
  imageUrl: string;
}

@Component({
  selector: 'gifts-client-portal-pages-wishlist-settings-product-form',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    FormlyModule,
    FormlyMaterialModule,
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent implements OnInit {
  private readonly _apollo = inject(Apollo);
  private readonly _dialogRef = inject(MatDialogRef);

  public readonly data = inject<{ item: null | any; wishlist: string }>(
    MAT_DIALOG_DATA
  );

  public form = new FormGroup({});

  public readonly model: ProductData = {
    title: '',
    description: '',
    price: 0,
    url: '',
    imageUrl: '',
  };

  public fields: FormlyFieldConfig[] = [
    {
      key: 'title',
      type: 'input',
      props: {
        label: 'Name',
        required: true,
      },
    },
    {
      key: 'description',
      type: 'textarea',
      props: {
        label: 'Description',
      },
    },
    {
      key: 'price',
      type: 'input',
      props: {
        label: 'Price',
        type: 'number',
      },
    },
    {
      key: 'imageUrl',
      type: 'input',
      props: {
        label: 'Image Url',
      },
    },
    {
      key: 'url',
      type: 'input',
      props: {
        label: 'Url',
      },
    },
  ];

  ngOnInit(): void {
    if (this.data.item) {
      this.model.title = this.data.item.title;
      this.model.description = this.data.item.description;
      this.model.price = this.data.item.price;
      this.model.url = this.data.item.url;
      this.model.imageUrl = this.data.item.imageUrl;
    }
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    if (this.data.item) {
      const input = {
        title: this.model.title,
        description: this.model.description,
        price: this.model.price,
        url: this.model.url,
        imageUrl: this.model.imageUrl,
      };

      this._apollo
        .mutate<{ updateItemInWishlist: any }>({
          mutation: gql`
            mutation UpdateItemInWishlist(
              $wishlistId: ID!
              $itemId: ID!
              $input: UpdateWishlistItemInput!
            ) {
              updateItemInWishlist(
                wishlistId: $wishlistId
                itemId: $itemId
                input: $input
              ) {
                id
                title
                description
                price
                imageUrl
                url
              }
            }
          `,
          variables: {
            input,
            itemId: this.data.item.id,
            wishlistId: this.data.wishlist,
          },
        })
        .subscribe((res) => {
          this._dialogRef.close(res.data?.updateItemInWishlist);
        });
    } else {
      this._apollo
        .mutate<{ addItemToWishlist: any }>({
          mutation: gql`
            mutation CreateWishlistItem(
              $wishlistId: ID!
              $input: CreateWishlistItemInput!
            ) {
              addItemToWishlist(wishlistId: $wishlistId, input: $input) {
                id
                title
                description
                price
                imageUrl
                url
              }
            }
          `,
          variables: {
            input: {
              ...this.model,
            },
            wishlistId: this.data.wishlist,
          },
        })
        .subscribe((res) => {
          this._dialogRef.close(res.data?.addItemToWishlist);
        });
    }
  }
}
