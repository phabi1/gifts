import { Injectable, inject } from '@angular/core';
import { empty } from '@apollo/client/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, Observable, map, of, tap } from 'rxjs';

@Injectable()
export class AuthenticationService {
  private _apollo: Apollo = inject(Apollo);

  private isAuthenticatingSubject = new BehaviorSubject<boolean>(false);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private isLoggedSubject = new BehaviorSubject<boolean>(false);

  public get isAuthenticating$() {
    return this.isAuthenticatingSubject.asObservable();
  }

  public get isAuthenticated$() {
    return this.isAuthenticatedSubject.asObservable();
  }

  public get isLogged$() {
    return this.isLoggedSubject.asObservable();
  }

  authenticate(wishlist: string): void {
    if (this.isAuthenticatingSubject.value) {
      return;
    }
    const token = this.getToken(wishlist);
    this.isAuthenticatingSubject.next(false);
    this.isAuthenticatedSubject.next(true);
    this.isLoggedSubject.next(!!token);
  }

  login(wishlist: string, password: string): Observable<boolean> {
    this.isAuthenticatingSubject.next(true);
    return this._apollo
      .mutate<{ authenticateWishlist: any }>({
        mutation: gql`
          mutation authenticateWishlist($wishlist: ID!, $password: String!) {
            authenticateWishlist(wishlist: $wishlist, password: $password) {
              logged
              token
            }
          }
        `,
        variables: {
          wishlist,
          password,
        },
      })
      .pipe(
        map((res) => res.data?.authenticateWishlist),
        tap(({ logged, token }) => {
          if (logged) {
            this.setToken(wishlist, token);
          }
        }),
        map((logged) => {
          this.isAuthenticatingSubject.next(false);
          this.isLoggedSubject.next(logged);
          this.isAuthenticatedSubject.next(true);
          return logged;
        })
      );
  }

  logout(wishlist: string) {
    this.removeToken(wishlist);

    this.isLoggedSubject.next(false);
    this.isAuthenticatedSubject.next(false);
  }

  protected getToken(wishlist: string): string | null {
    const credentials = JSON.parse(
      localStorage.getItem('wishlist_credentials') || '{}'
    );
    return credentials[wishlist] || null;
  }

  protected setToken(wishlist: string, token: string) {
    const credentials = JSON.parse(
      localStorage.getItem('wishlist_credentials') || '{}'
    );
    localStorage.setItem(
      'wishlist_credentials',
      JSON.stringify({ ...credentials, [wishlist]: token })
    );
  }

  protected removeToken(wishlist: string) {
    const credentials = JSON.parse(
      localStorage.getItem('wishlist_credentials') || '{}'
    );

    delete credentials[wishlist];

    localStorage.setItem('wishlist_credentials', JSON.stringify(credentials));
  }
}
