import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { InventoryStorageService } from './storage.service';
import { InventoryItem } from '../Interfaces/InventoryItem';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private itemsSubject = new BehaviorSubject<InventoryItem[]>([]);
  items$ = this.itemsSubject.asObservable();

  // Shared state: which category the sidebar currently has selected.
  // Dashboard page reads this so Sidebar and Dashboard stay in sync
  // even though they are on different routed components.
  private selectedCategorySubject = new BehaviorSubject<string>('');
  selectedCategory$ = this.selectedCategorySubject.asObservable();

  constructor(private _storage: InventoryStorageService) {
    this.itemsSubject.next(this._storage.getAll());
  }

  get currentItems(): InventoryItem[] {
    return this.itemsSubject.value;
  }

  setSelectedCategory(category: string): void {
    this.selectedCategorySubject.next(category);
  }

  get currentSelectedCategory(): string {
    return this.selectedCategorySubject.value;
  }

  addItem(item: InventoryItem): void {
    const updated = [item, ...this.currentItems];
    this.itemsSubject.next(updated);
    this._storage.saveAll(updated);
  }

  updateItem(id: string, changes: Partial<InventoryItem>): void {
    const updated = this.currentItems.map(x => (x.id === id ? { ...x, ...changes } : x));
    this.itemsSubject.next(updated);
    this._storage.saveAll(updated);
  }

  deleteItem(id: string): void {
    const updated = this.currentItems.filter(x => x.id !== id);
    this.itemsSubject.next(updated);
    this._storage.saveAll(updated);
  }

  isLowStock(item: InventoryItem): boolean {
    return item.quantity <= item.minStockLevel;
  }

  isOutOfStock(item: InventoryItem): boolean {
    return item.quantity <= 0;
  }

  itemTotalValue(item: InventoryItem): number {
    return item.quantity * item.unitPrice;
  }

  getTotalValue(items: InventoryItem[]): number {
    return items.reduce((sum, x) => sum + this.itemTotalValue(x), 0);
  }

  getLowStockCount(items: InventoryItem[]): number {
    return items.filter(x => this.isLowStock(x)).length;
  }

  getCategoryBreakdown(items: InventoryItem[]): { category: string; quantity: number; value: number }[] {
    const map = new Map<string, { quantity: number; value: number }>();

    for (const item of items) {
      const existing = map.get(item.category) ?? { quantity: 0, value: 0 };
      existing.quantity += item.quantity;
      existing.value += this.itemTotalValue(item);
      map.set(item.category, existing);
    }

    return Array.from(map.entries()).map(([category, data]) => ({
      category,
      quantity: data.quantity,
      value: data.value
    }));
  }
}