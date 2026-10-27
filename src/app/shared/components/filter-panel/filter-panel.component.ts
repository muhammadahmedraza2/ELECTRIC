import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FilterState, Product } from '../../../core/models';

@Component({
  selector: 'app-filter-panel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './filter-panel.component.html',
  styleUrls: [],
})
export class FilterPanelComponent implements OnChanges {
  private fb = inject(FormBuilder);
  @Input() products: Product[] = [];
  @Output() filterChange = new EventEmitter<FilterState>();
  availableBrands: string[] = [];
  filterForm = this.fb.group({
    brands: this.fb.control<string[]>([]),
    minPrice: this.fb.control<number | null>(null),
    maxPrice: this.fb.control<number | null>(null),
    minRating: this.fb.control<number | null>(null),
    inStockOnly: this.fb.control(false),
  });
  ngOnChanges(): void {
    this.availableBrands = [
      ...new Set(this.products.map((x) => x.brand).filter((brand): brand is string => !!brand)),
    ].sort();
  }
  toggleBrand(brand: string): void {
    const brands = this.filterForm.controls.brands.value ?? [];
    const updatedBrands = brands.includes(brand)
      ? brands.filter((x) => x !== brand)
      : [...brands, brand];
    this.filterForm.controls.brands.setValue(updatedBrands);
    this.emitChange();
  }
  isBrandSelected(brand: string): boolean {
    return (this.filterForm.controls.brands.value ?? []).includes(brand);
  }
  setRating(rating: number): void {
    const currentRating = this.filterForm.controls.minRating.value;
    this.filterForm.controls.minRating.setValue(currentRating === rating ? null : rating);
    this.emitChange();
  }
  emitChange(): void {
    const value = this.filterForm.getRawValue();
    this.filterChange.emit({
      brands: value.brands ?? [],
      minPrice: value.minPrice,
      maxPrice: value.maxPrice,
      minRating: value.minRating,
      inStockOnly: value.inStockOnly ?? false,
    });
  }
  resetFilters(): void {
    this.filterForm.reset({
      brands: [],
      minPrice: null,
      maxPrice: null,
      minRating: null,
      inStockOnly: false,
    });
    this.emitChange();
  }
}
