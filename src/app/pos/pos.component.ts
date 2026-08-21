import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService, Item } from '../services/data.service';
import { CartService } from '../services/cart.service';
import { FavoritesService } from '../services/favorites.service';
import { SalesService } from '../services/sales.service';

@Component({
  selector: 'app-pos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pos.component.html',
  styleUrls: []
})
export class PosComponent {
  searchTerm = signal('');
  activeCategory = signal<string>('all');

  filteredItems = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const cat = this.activeCategory();
    return this.data.items.filter(i => {
      const matchesCat = cat === 'all' || i.category === cat;
      const matchesTerm = !term || i.name.toLowerCase().includes(term) || i.brand.toLowerCase().includes(term);
      return matchesCat && matchesTerm && i.stock > 0;
    });
  });

  constructor(
    public data: DataService,
    public cart: CartService,
    public fav: FavoritesService,
    public sales: SalesService,
    private router: Router
  ) {}

  setCategory(slug: string) {
    this.activeCategory.set(slug);
  }

  add(item: Item) {
    this.cart.addToCart(item, 1);
  }

  toggleFav(item: Item) {
    this.fav.toggle(item.id);
  }

  checkout() {
    if (this.cart.cartLines().length === 0) return;
    this.sales.recordSale(this.cart.cartLines());
    this.cart.clearCart();
    this.router.navigate(['/sales']);
  }
}
