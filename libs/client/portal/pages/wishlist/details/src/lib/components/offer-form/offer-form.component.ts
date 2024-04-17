import { Component, inject } from '@angular/core';
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

@Component({
  selector: 'gifts-client-portal-pages-wishlist-details-offer-form',
  standalone: true,
  imports: [
    FormlyModule,
    FormlyMaterialModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './offer-form.component.html',
  styleUrl: './offer-form.component.css',
})
export class OfferFormComponent {
  private _apollo: Apollo = inject(Apollo);
  private _data = inject(MAT_DIALOG_DATA);
  private _dialogRef = inject(MatDialogRef);

  form = new FormGroup({});

  model = {
    name: '',
    message: '',
  };

  fields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      props: {
        label: 'Name',
        required: true,
      },
    },
    {
      key: 'message',
      type: 'textarea',
      props: {
        label: 'Message',
      },
    },
  ];

  submit() {
    if (this.form.invalid) {
      return;
    }
    this._apollo
      .mutate({
        mutation: gql`
          mutation OfferItemOfWishlist(
            $wishlistId: ID!
            $itemId: ID!
            $name: String!
            $message: String
          ) {
            offerItem(
              wishlistId: $wishlistId
              itemId: $itemId
              name: $name
              message: $message
            ) {
              id
            }
          }
        `,
        variables: {
          wishlistId: this._data.wishlistId,
          itemId: this._data.item.id,
          name: this.model.name,
          message: this.model.message,
        },
      })
      .subscribe(() => {
        this._dialogRef.close();
      });
  }
}
