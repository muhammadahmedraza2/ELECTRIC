import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product, getDiscountedPrice, getProductStatus } from '../../../core/models';
import { CartService } from '../../../core/services/cart.service';
import { WishlistService } from '../../../core/services/wishlist.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-card.component.html',
  styleUrls: []
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;

  constructor(public cart: CartService, public wishlist: WishlistService, private toast: ToastService) {}

  get discountedPrice(): number {
    return getDiscountedPrice(this.product);
  }

  get status(): string {
    return getProductStatus(this.product.stock);
  }

  get statusClass(): string {
    const s = this.status;
    return s === 'In Stock' ? 'badge-instock' : s === 'Low Stock' ? 'badge-low' : 'badge-out';
  }

  get ratingStars(): number[] {
    return Array.from({ length: 5 }, (_, i) => i);
  }

  addToCart(event: Event) {
    event.stopPropagation();
    if (this.product.stock === 0) return;
    this.cart.addToCart(this.product, 1);
    this.toast.show(`${this.product.name} added to cart`, 'success');
  }

  toggleWishlist(event: Event) {
    event.stopPropagation();
    this.wishlist.toggle(this.product.id);
  }
}
