import { Product } from './product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartSummary {
  subtotal: number;
  discount: number;
  deliveryCharges: number;
  grandTotal: number;
  itemCount: number;
}
