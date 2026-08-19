import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { INVENTORY_CATEGORIES, InventoryItem } from '../../../Interfaces/InventoryItem';
// import { INVENTORY_CATEGORIES, InventoryItem } from '../../models/inventory-item.model';

@Component({
  selector: 'app-inventory-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  @Input() items: InventoryItem[] = [];
  @Input() selectedCategory = '';
  @Output() categorySelected = new EventEmitter<string>();

  categories = INVENTORY_CATEGORIES;

  countFor(categoryName: string): number {
    return this.items.filter(x => x.category === categoryName).length;
  }

  get totalCount(): number {
    return this.items.length;
  }

  select(categoryName: string): void {
    this.categorySelected.emit(categoryName);
  }
}