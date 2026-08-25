import { SortOption } from '../models';

export const SORT_OPTIONS: SortOption[] = [
  { key: 'default', label: 'Default' },
  { key: 'price-asc', label: 'Price: Low to High' },
  { key: 'price-desc', label: 'Price: High to Low' },
  { key: 'name-asc', label: 'Name: A-Z' },
  { key: 'name-desc', label: 'Name: Z-A' },
  { key: 'rating', label: 'Rating' },
  { key: 'newest', label: 'Newest' },
  { key: 'best-selling', label: 'Best Selling' },
];
