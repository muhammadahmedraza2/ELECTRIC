import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterState, Product } from '../../../core/models';

@Component({
  selector: 'app-filter-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-panel.component.html',
  styleUrls: []
})
export class FilterPanelComponent implements OnChanges {
  @Input() products: Product[] = [];
  @Output() filterChange = new EventEmitter<FilterState>();

  availableBrands: string[] = [];
  selectedBrands: string[] = [];
  minPrice: number | null = null;
  maxPrice: number | null = null;
  minRating: number | null = null;
  inStockOnly = false;

  ngOnChanges(): void {
    this.availableBrands = Array.from(new Set(this.products.map(p => p.brand))).sort();
  }

  toggleBrand(brand: string) {
    this.selectedBrands = this.selectedBrands.includes(brand)
      ? this.selectedBrands.filter(b => b !== brand)
      : [...this.selectedBrands, brand];
    this.emitChange();
  }

  setRating(rating: number) {
    this.minRating = this.minRating === rating ? null : rating;
    this.emitChange();
  }

  emitChange() {
    this.filterChange.emit({
      brands: this.selectedBrands,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      minRating: this.minRating,
      inStockOnly: this.inStockOnly
    });
  }

  resetFilters() {
    this.selectedBrands = [];
    this.minPrice = null;
    this.maxPrice = null;
    this.minRating = null;
    this.inStockOnly = false;
    this.emitChange();
  }
}
