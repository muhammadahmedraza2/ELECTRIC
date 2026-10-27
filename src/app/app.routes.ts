import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { demoAuthGuard } from './core/guards/demo-auth.guard';

export const routes: Routes = [
  {
    path: 'businesses',
    loadComponent: () => import('./features/onboarding/business-type-selector.component').then(m => m.BusinessTypeSelectorComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'setup/business-type',
    canActivate: [demoAuthGuard],
    loadComponent: () => import('./features/onboarding/business-type-selector.component').then(m => m.BusinessTypeSelectorComponent)
  },
  {
    path: 'admin',
    canActivate: [demoAuthGuard],
    loadComponent: () => import('./layouts/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./modules/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'products',
        loadComponent: () => import('./features/inventory/business-inventory.component').then(m => m.BusinessInventoryComponent)
      },
      {
        path: 'orders',
        loadComponent: () => import('./modules/orders/orders.component').then(m => m.OrdersComponent)
      },
      {
        path: 'reports',
        loadComponent: () => import('./modules/reports/reports.component').then(m => m.ReportsComponent)
      },
      {
        path: 'settings',
        loadComponent: () => import('./modules/settings/theme-settings.component').then(m => m.ThemeSettingsComponent)
      },
      {
        path: 'modules/:slug',
        loadComponent: () => import('./features/workspace/business-module-preview.component').then(m => m.BusinessModulePreviewComponent)
      }
    ]
  },
  {
    path: 'store',
    loadComponent: () => import('./layouts/customer-layout/customer-layout.component').then(m => m.CustomerLayoutComponent),
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
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
        path: 'help',
        loadComponent: () => import('./modules/help/help.component').then(m => m.HelpComponent)
      }
    ]
  },
  {
    path: 'app',
    canActivate: [demoAuthGuard],
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
  { path: '', redirectTo: 'businesses', pathMatch: 'full' },
  { path: '**', redirectTo: 'businesses' }
];
