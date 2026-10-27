import { MenuNode } from '../models';

/**
 * Single source of truth for sidebar navigation.
 * Sidebar renders this recursively — never hardcode menu HTML per item.
 */
export const MENU_CONFIG: MenuNode[] = [
  { id: 1, name: 'Dashboard', icon: 'bi-grid-1x2', route: '/admin/dashboard' },
  { id: 6, name: 'Business Type', icon: 'bi-shop-window', route: '/setup/business-type' },
  { id: 2, name: 'Products', icon: 'bi-box-seam', route: '/admin/products' },
  { id: 3, name: 'Orders', icon: 'bi-receipt', route: '/admin/orders' },
  { id: 4, name: 'Reports', icon: 'bi-bar-chart-line', route: '/admin/reports' },
  { id: 5, name: 'Settings', icon: 'bi-gear', route: '/admin/settings' }
];
