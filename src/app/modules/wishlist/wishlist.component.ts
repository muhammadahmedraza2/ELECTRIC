import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/services/product.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { Product } from '../../core/models';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, LoadingComponent, EmptyStateComponent],
  templateUrl: './wishlist.component.html',
  styleUrls: []
})
export class WishlistComponent implements OnInit {
  loading = signal(true);
  allProducts = signal<Product[]>([]);

  wishlistedProducts = computed(() =>
    this.allProducts().filter(p => this.wishlist.wishlistIds().includes(p.id))
  );

  constructor(private productService: ProductService, public wishlist: WishlistService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(list => {
      this.allProducts.set(list);
      this.loading.set(false);
    });
  }
}
