export interface OrderItem {
  productId: number;
  name: string;
  brand: string;
  quantity: number;
  price: number;
}

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
export type PaymentMethod = 'cash_on_delivery' | 'easypaisa';
export type PaymentStatus = 'pending' | 'paid' | 'failed';

export interface Order {
  id: number;
  orderNumber: string;
  customerName: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  paymentMethod?: PaymentMethod;
  paymentStatus?: PaymentStatus;
}
