import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService, Item } from '../services/data.service';
import { CartService } from '../services/cart.service';
import { FavoritesService } from '../services/favorites.service';

type SortKey = 'name-asc' | 'price-asc' | 'price-desc' | 'stock-desc';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category.component.html',
  styleUrls: [] // global styling only
})
export class CategoryComponent implements OnInit {
  slug = '';
  categoryName = '';
  baseItems: Item[] = [];

  searchTerm = signal('');
  sortBy = signal<SortKey>('name-asc');

  filteredItems = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const sort = this.sortBy();
    let list = this.baseItems.filter(i => !term || i.name.toLowerCase().includes(term) || i.brand.toLowerCase().includes(term));
    list = [...list].sort((a, b) => {
      switch (sort) {
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'stock-desc': return b.stock - a.stock;
        default: return a.name.localeCompare(b.name);
      }
    });
    return list;
  });

  constructor(
    private route: ActivatedRoute,
    public data: DataService,
    public cart: CartService,
    public fav: FavoritesService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.slug = params.get('slug') || '';
      this.categoryName = this.data.getCategoryName(this.slug);
      this.baseItems = this.data.getItemsByCategory(this.slug);
      this.searchTerm.set('');
    });
  }

  setSort(event: Event) {
    this.sortBy.set((event.target as HTMLSelectElement).value as SortKey);
  }

  add(item: Item) { this.cart.addToCart(item, 1); }
  toggleFav(item: Item) { this.fav.toggle(item.id); }
}
