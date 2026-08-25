export interface Product {
  id: number;
  name: string;
  category: string;      // main category slug
  subCategory: string;   // sub category slug
  brand: string;
  model: string;
  price: number;
  discount: number;      // percentage
  stock: number;
  rating: number;        // 0-5
  image: string;         // icon class used as placeholder image
  description: string;
  specifications: { label: string; value: string }[];
  features: string[];
  warranty: string;
  isFeatured: boolean;
  isOffer: boolean;
  createdAt: string; // ISO date, used for "Newest" sort
  soldCount: number; // used for "Best Selling" sort
}

export type ProductStatus = 'In Stock' | 'Low Stock' | 'Out of Stock';

export function getProductStatus(stock: number): ProductStatus {
  if (stock === 0) return 'Out of Stock';
  if (stock <= 8) return 'Low Stock';
  return 'In Stock';
}

export function getDiscountedPrice(p: Product): number {
  return Math.round(p.price - (p.price * p.discount) / 100);
}
