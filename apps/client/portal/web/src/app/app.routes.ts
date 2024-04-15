import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('@gifts/client-portal-pages-home').then(
        (m) => m.clientPortalPagesHomeRoutes
      ),
  },
  {
    path: 'wishlist/create',
    loadChildren: () =>
      import('@gifts/client-portal-pages-wishlist-create').then(
        (m) => m.clientPortalPagesWishlistCreateRoutes
      ),
  },
  {
    path: 'wishlist/:wishlist',
    loadChildren: () =>
      import('@gifts/client-portal-pages-wishlist-details').then(
        (m) => m.clientPortalPagesWishlistDetailsRoutes
      ),
  },
  {
    path: 'wishlist/:wishlist/settings',
    loadChildren: () =>
      import('@gifts/client-portal-pages-wishlist-settings').then(
        (m) => m.clientPortalPagesWishlistSettingsRoutes
      ),
  },
];
