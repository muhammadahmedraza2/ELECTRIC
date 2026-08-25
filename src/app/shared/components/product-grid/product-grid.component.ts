import { Component, Input, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product, FilterState, getDiscountedPrice } from '../../../core/models';
import { ProductCardComponent } from '../product-card/product-card.component';
import { FilterPanelComponent } from '../filter-panel/filter-panel.component';
import { SortDropdownComponent } from '../sort-dropdown/sort-dropdown.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { LoadingComponent } from '../loading/loading.component';
import { EmptyStateComponent } from '../empty-state/empty-state.component';

const EMPTY_FILTER: FilterState = { brands: [], minPrice: null, maxPrice: null, minRating: null, inStockOnly: false };

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent, FilterPanelComponent, SortDropdownComponent, PaginationComponent, LoadingComponent, EmptyStateComponent],
  templateUrl: './product-grid.component.html',
  styleUrls: []
})
export class ProductGridComponent {
  private _products = signal<Product[]>([]);
  @Input() set products(val: Product[]) { this._products.set(val || []); this.currentPage.set(1); }
  get products(): Product[] { return this._products(); }

  @Input() loading = false;
  @Input() showFilters = true;

  searchTerm = signal('');
  filterState = signal<FilterState>(EMPTY_FILTER);
  sortKey = signal('default');
  currentPage = signal(1);
  pageSize = signal(8);

  filteredSorted = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const filter = this.filterState();
    let list = this._products().filter(p => {
      const matchesTerm = !term || p.name.toLowerCase().includes(term) || p.brand.toLowerCase().includes(term);
      const matchesBrand = filter.brands.length === 0 || filter.brands.includes(p.brand);
      const matchesMin = filter.minPrice == null || p.price >= filter.minPrice;
      const matchesMax = filter.maxPrice == null || p.price <= filter.maxPrice;
      const matchesRating = filter.minRating == null || p.rating >= filter.minRating;
      const matchesStock = !filter.inStockOnly || p.stock > 0;
      return matchesTerm && matchesBrand && matchesMin && matchesMax && matchesRating && matchesStock;
    });

    const sort = this.sortKey();
    list = [...list].sort((a, b) => {
      switch (sort) {
        case 'price-asc': return getDiscountedPrice(a) - getDiscountedPrice(b);
        case 'price-desc': return getDiscountedPrice(b) - getDiscountedPrice(a);
        case 'name-asc': return a.name.localeCompare(b.name);
        case 'name-desc': return b.name.localeCompare(a.name);
        case 'rating': return b.rating - a.rating;
        case 'newest': return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'best-selling': return b.soldCount - a.soldCount;
        default: return 0;
      }
    });

    return list;
  });

  pagedItems = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.filteredSorted().slice(start, start + this.pageSize());
  });

  onFilterChange(f: FilterState) { this.filterState.set(f); this.currentPage.set(1); }
  onSortChange(key: string) { this.sortKey.set(key); }
  onPageChange(p: number) { this.currentPage.set(p); }
  onPageSizeChange(size: number) { this.pageSize.set(size); this.currentPage.set(1); }
}
