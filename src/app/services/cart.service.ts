import { Injectable, signal, computed, effect } from '@angular/core';
import { Item } from './data.service';

export interface CartLine {
  item: Item;
  qty: number;
}

const CART_KEY = 'ed_cart';

@Injectable({ providedIn: 'root' })
export class CartService {

  private lines = signal<CartLine[]>(this.loadFromStorage());

  cartLines = computed(() => this.lines());
  cartCount = computed(() => this.lines().reduce((sum, l) => sum + l.qty, 0));
  cartTotal = computed(() => this.lines().reduce((sum, l) => sum + l.qty * l.item.price, 0));

  constructor() {
    effect(() => {
      localStorage.setItem(CART_KEY, JSON.stringify(this.lines()));
    });
  }

  private loadFromStorage(): CartLine[] {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    } catch {
      return [];
    }
  }

  addToCart(item: Item, qty: number = 1) {
    const existing = this.lines().find(l => l.item.id === item.id);
    if (existing) {
      this.updateQty(item.id, existing.qty + qty);
    } else {
      this.lines.update(lines => [...lines, { item, qty }]);
    }
  }

  updateQty(itemId: number, qty: number) {
    if (qty <= 0) {
      this.removeFromCart(itemId);
      return;
    }
    this.lines.update(lines => lines.map(l => l.item.id === itemId ? { ...l, qty } : l));
  }

  removeFromCart(itemId: number) {
    this.lines.update(lines => lines.filter(l => l.item.id !== itemId));
  }

  clearCart() {
    this.lines.set([]);
  }

  isInCart(itemId: number): boolean {
    return this.lines().some(l => l.item.id === itemId);
  }
}
