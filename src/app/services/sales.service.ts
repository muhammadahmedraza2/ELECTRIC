import { Injectable, signal, computed, effect } from '@angular/core';
import { CartLine } from './cart.service';

export interface SaleLine {
  itemId: number;
  name: string;
  category: string;
  brand: string;
  qty: number;
  price: number;
}

export interface Sale {
  id: number;
  date: string; // ISO string
  lines: SaleLine[];
  total: number;
}

const SALES_KEY = 'ed_sales';

@Injectable({ providedIn: 'root' })
export class SalesService {

  private salesList = signal<Sale[]>(this.loadFromStorage());

  sales = computed(() => [...this.salesList()].sort((a, b) => b.id - a.id));
  totalRevenue = computed(() => this.salesList().reduce((sum, s) => sum + s.total, 0));
  totalOrders = computed(() => this.salesList().length);

  constructor() {
    effect(() => {
      localStorage.setItem(SALES_KEY, JSON.stringify(this.salesList()));
    });
  }

  private loadFromStorage(): Sale[] {
    try {
      return JSON.parse(localStorage.getItem(SALES_KEY) || '[]');
    } catch {
      return [];
    }
  }

  recordSale(lines: CartLine[]): Sale {
    const saleLines: SaleLine[] = lines.map(l => ({
      itemId: l.item.id,
      name: l.item.name,
      category: l.item.category,
      brand: l.item.brand,
      qty: l.qty,
      price: l.item.price
    }));
    const total = saleLines.reduce((sum, l) => sum + l.qty * l.price, 0);
    const sale: Sale = {
      id: Date.now(),
      date: new Date().toISOString(),
      lines: saleLines,
      total
    };
    this.salesList.update(list => [...list, sale]);
    return sale;
  }
}
