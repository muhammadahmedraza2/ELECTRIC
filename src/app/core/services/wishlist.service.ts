import { Injectable, signal, effect } from '@angular/core';

const WISHLIST_KEY = 'es_wishlist';

@Injectable({ providedIn: 'root' })
export class WishlistService {

  private ids = signal<number[]>(this.loadFromStorage());
  wishlistIds = this.ids.asReadonly();

  constructor() {
    effect(() => localStorage.setItem(WISHLIST_KEY, JSON.stringify(this.ids())));
  }

  private loadFromStorage(): number[] {
    try { return JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]'); } catch { return []; }
  }

  isWishlisted(productId: number): boolean {
    return this.ids().includes(productId);
  }

  toggle(productId: number) {
    this.ids.update(list => list.includes(productId) ? list.filter(id => id !== productId) : [...list, productId]);
  }
}
