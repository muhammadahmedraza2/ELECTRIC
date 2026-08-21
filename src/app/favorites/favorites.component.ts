import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data.service';
import { FavoritesService } from '../services/favorites.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites.component.html',
  styleUrls: []
})
export class FavoritesComponent {
  favoriteItems = computed(() =>
    this.data.items.filter(i => this.fav.favorites().includes(i.id))
  );

  constructor(public data: DataService, public fav: FavoritesService, public cart: CartService) {}
}
