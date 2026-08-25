import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, getDiscountedPrice, getProductStatus } from '../../../core/models';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';
import { WishlistService } from '../../../core/services/wishlist.service';
import { ToastService } from '../../../core/services/toast.service';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, LoadingComponent, EmptyStateComponent],
  templateUrl: './product-details.component.html',
  styleUrls: []
})
export class ProductDetailsComponent implements OnInit {
  loading = signal(true);
  product = signal<Product | null>(null);
  quantity = signal(1);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    public cart: CartService,
    public wishlist: WishlistService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.loading.set(true);
      this.productService.getProductById(id).subscribe(p => {
        this.product.set(p ?? null);
        this.loading.set(false);
      });
    });
  }

  get discountedPrice(): number {
    return this.product() ? getDiscountedPrice(this.product()!) : 0;
  }

  get status(): string {
    return this.product() ? getProductStatus(this.product()!.stock) : '';
  }

  get ratingStars(): number[] {
    return Array.from({ length: 5 }, (_, i) => i);
  }

  changeQty(delta: number) {
    const next = this.quantity() + delta;
    if (next >= 1 && next <= (this.product()?.stock ?? 1)) this.quantity.set(next);
  }

  addToCart() {
    if (!this.product()) return;
    this.cart.addToCart(this.product()!, this.quantity());
    this.toast.show(`${this.product()!.name} added to cart`, 'success');
  }

  buyNow() {
    this.addToCart();
    this.router.navigate(['/app/cart']);
  }

  toggleWishlist() {
    if (this.product()) this.wishlist.toggle(this.product()!.id);
  }
}
