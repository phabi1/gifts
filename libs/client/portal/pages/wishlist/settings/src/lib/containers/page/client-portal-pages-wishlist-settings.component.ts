import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { first } from 'rxjs';
import { InformationsFormComponent } from '../../components/informations-form/informations-form.component';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { ProductsFormComponent } from '../../components/products-form/products-form.component';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'client-portal-pages-wishlist-settings-page',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    LoginFormComponent,
    InformationsFormComponent,
    ProductsFormComponent,
  ],
  templateUrl: './client-portal-pages-wishlist-settings.component.html',
  styleUrl: './client-portal-pages-wishlist-settings.component.css',
  providers: [AuthenticationService],
})
export class ClientPortalPagesWishlistSettingsComponent
  implements OnInit, OnDestroy
{
  private _apollo: Apollo = inject(Apollo);
  private _route: ActivatedRoute = inject(ActivatedRoute);

  public readonly authenicationService: AuthenticationService = inject(
    AuthenticationService
  );

  public wishlist: null | any = null;

  ngOnInit(): void {
    this.authenicationService.isAuthenticated$
      .pipe(first())
      .subscribe((isAuthenticated) => {
        if (!isAuthenticated) {
          this.authenicationService.authenticate(
            this._route.snapshot.params['wishlist']
          );
        }
      });

    this._apollo
      .query<{wishlist: any}>({
        query: gql`
          query GetWishlist($id: ID!) {
            wishlist(id: $id) {
              id
              title
              description
              name
              items {
                id
                title
                url
                price
                imageUrl
              }
            }
          }
        `,
        variables: {
          id: this._route.snapshot.params['wishlist'],
        },
      })
      .subscribe((result) => {
        this.wishlist = result.data?.wishlist;
      });
  }

  ngOnDestroy(): void {
    this.authenicationService.logout(this._route.snapshot.params['wishlist']);
  }
}
