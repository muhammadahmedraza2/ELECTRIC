import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: 'app',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./modules/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'products',
        loadComponent: () => import('./modules/products/category-page/category-page.component').then(m => m.CategoryPageComponent)
      },
      {
        path: 'electronics/:slug',
        loadComponent: () => import('./modules/products/category-page/category-page.component').then(m => m.CategoryPageComponent)
      },
      {
        path: 'product/:id',
        loadComponent: () => import('./modules/products/product-details/product-details.component').then(m => m.ProductDetailsComponent)
      },
      {
        path: 'cart',
        loadComponent: () => import('./modules/cart/cart.component').then(m => m.CartComponent)
      },
      {
        path: 'wishlist',
        loadComponent: () => import('./modules/wishlist/wishlist.component').then(m => m.WishlistComponent)
      },
      {
        path: 'orders',
        loadComponent: () => import('./modules/orders/orders.component').then(m => m.OrdersComponent)
      },
      {
        path: 'offers',
        loadComponent: () => import('./modules/offers/offers.component').then(m => m.OffersComponent)
      },
      {
        path: 'reports',
        loadComponent: () => import('./modules/reports/reports.component').then(m => m.ReportsComponent)
      },
      {
        path: 'help',
        loadComponent: () => import('./modules/help/help.component').then(m => m.HelpComponent)
      },
      {
        path: 'settings',
        loadComponent: () => import('./modules/settings/theme-settings.component').then(m => m.ThemeSettingsComponent)
      },
    ]
  },
  { path: '', redirectTo: 'app/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'app/dashboard' }
];
