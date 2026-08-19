import { Injectable } from '@angular/core';
import { InventoryItem } from '../Interfaces/InventoryItem';

const STORAGE_KEY = 'electrician_inventory_items';

/**
 * Only place that talks to the real data source.
 * Uses localStorage today; swap with HttpClient calls later
 * without touching any other file in the app.
 */
@Injectable({ providedIn: 'root' })
export class InventoryStorageService {
  getAll(): InventoryItem[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  saveAll(items: InventoryItem[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }
}