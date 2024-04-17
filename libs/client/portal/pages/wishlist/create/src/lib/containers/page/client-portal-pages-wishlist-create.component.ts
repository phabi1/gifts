import { Component, inject } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'client-portal-pages-wishlist-create-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    FormlyModule,
    FormlyMaterialModule,
    MatButtonModule,
  ],
  templateUrl: './client-portal-pages-wishlist-create.component.html',
  styleUrl: './client-portal-pages-wishlist-create.component.css',
})
export class ClientPortalPagesWishlistCreateComponent {
  private _apollo: Apollo = inject(Apollo);
  private _router: Router = inject(Router);

  form = new FormGroup({});
  model = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'title',
      type: 'input',
      props: {
        label: 'Title',
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
      key: 'name',
      type: 'input',
      props: {
        label: 'Name',
        required: true,
      },
    },
    {
      key: 'password',
      type: 'input',
      props: {
        type: 'password',
        label: 'Password',
        required: true,
      },
    },
  ];

  save() {
    console.log(this.model);
    this._apollo
      .mutate<{ createWishlist: any }>({
        mutation: gql`
          mutation createWishlist($input: CreateWishlistInput!) {
            createWishlist(input: $input) {
              id
              name
            }
          }
        `,
        variables: {
          input: this.model,
        },
      })
      .subscribe((res) => {
        const wishlist = res.data?.createWishlist;
        this._router.navigate(['/wishlist', wishlist.name]);
      });
  }
}
