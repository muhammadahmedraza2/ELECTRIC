import { Injectable, PLATFORM_ID, effect, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const WISHLIST_KEY = 'es_wishlist';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private readonly platformId = inject(PLATFORM_ID);

  private ids = signal<number[]>(this.loadFromStorage());
  wishlistIds = this.ids.asReadonly();

  constructor() {
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem(WISHLIST_KEY, JSON.stringify(this.ids()));
      }
    });
  }

  private loadFromStorage(): number[] {
    if (!isPlatformBrowser(this.platformId)) return [];
    try { return JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]'); } catch { return []; }
  }

  isWishlisted(productId: number): boolean {
    return this.ids().includes(productId);
  }

  toggle(productId: number) {
    this.ids.update(list => list.includes(productId) ? list.filter(id => id !== productId) : [...list, productId]);
  }
}
