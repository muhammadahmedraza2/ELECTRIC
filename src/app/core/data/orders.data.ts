import { Order } from '../models';

const STATUSES: Order['status'][] = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
const CUSTOMERS = ['Ahmed Khan', 'Sara Malik', 'Bilal Hussain', 'Ayesha Noor', 'Usman Tariq', 'Hina Raza', 'Fahad Iqbal', 'Zara Sheikh'];

function buildOrders(): Order[] {
  const orders: Order[] = [];
  for (let i = 1; i <= 24; i++) {
    const itemCount = 1 + (i % 3);
    const items = Array.from({ length: itemCount }).map((_, idx) => ({
      productId: i * 10 + idx,
      name: `Product Item ${idx + 1}`,
      brand: 'Generic',
      quantity: 1 + (idx % 2),
      price: 5000 + (i * 350) + idx * 1200
    }));
    const total = items.reduce((sum, it) => sum + it.price * it.quantity, 0);
    orders.push({
      id: i,
      orderNumber: `ORD-${2026000 + i}`,
      customerName: CUSTOMERS[i % CUSTOMERS.length],
      date: new Date(Date.now() - i * 3 * 86400000).toISOString(),
      items,
      total,
      status: STATUSES[i % STATUSES.length]
    });
  }
  return orders;
}

export const ORDERS: Order[] = buildOrders();
