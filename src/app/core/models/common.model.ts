export interface SortOption {
  key: string;
  label: string;
}

export interface FilterState {
  brands: string[];
  minPrice: number | null;
  maxPrice: number | null;
  minRating: number | null;
  inStockOnly: boolean;
}

export interface GridColumn<T> {
  field: keyof T | string;
  label: string;
  sortable?: boolean;
  type?: 'text' | 'number' | 'currency' | 'status' | 'date';
}

export interface DashboardSummary {
  totalProducts: number;
  totalCategories: number;
  totalOrders: number;
  totalSales: number;
  pendingOrders: number;
  lowStockProducts: number;
  activeOffers: number;
}

export type LoadState = 'idle' | 'loading' | 'success' | 'error';
