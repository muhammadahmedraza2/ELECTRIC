import { Injectable, signal, effect } from '@angular/core';

const FAV_KEY = 'ed_favorites';

@Injectable({ providedIn: 'root' })
export class FavoritesService {

  private favIds = signal<number[]>(this.loadFromStorage());

  favorites = this.favIds.asReadonly();

  constructor() {
    effect(() => {
      localStorage.setItem(FAV_KEY, JSON.stringify(this.favIds()));
    });
  }

  private loadFromStorage(): number[] {
    try {
      return JSON.parse(localStorage.getItem(FAV_KEY) || '[]');
    } catch {
      return [];
    }
  }

  isFavorite(itemId: number): boolean {
    return this.favIds().includes(itemId);
  }

  toggle(itemId: number) {
    if (this.isFavorite(itemId)) {
      this.favIds.update(ids => ids.filter(id => id !== itemId));
    } else {
      this.favIds.update(ids => [...ids, itemId]);
    }
  }
}
