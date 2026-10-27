import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { OrderService } from '../../core/services/order.service';
import { ToastService } from '../../core/services/toast.service';
import { getDiscountedPrice, Product } from '../../core/models';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { API_CONFIG } from '../../core/constants/api-config';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, EmptyStateComponent],
  templateUrl: './cart.component.html',
  styleUrls: []
})
export class CartComponent {
  readonly isDemoMode = API_CONFIG.useMockData;
  isSubmitting = false;

  constructor(public cart: CartService, private orderService: OrderService, private toast: ToastService, private router: Router) {}

  lineTotal(product: Product, qty: number): number {
    return getDiscountedPrice(product) * qty;
  }

  checkout(): void {
    if (this.cart.cartItems().length === 0 || this.isSubmitting) return;
    this.isSubmitting = true;
    const items = this.cart.cartItems().map(l => ({
      productId: l.product.id, name: l.product.name, brand: l.product.brand, quantity: l.quantity, price: getDiscountedPrice(l.product)
    }));

    this.orderService.createOrder({
      items,
      total: this.cart.summary().grandTotal,
      status: 'Pending',
      paymentMethod: 'cash_on_delivery',
      paymentStatus: 'pending'
    }).subscribe({
      next: res => {
        this.isSubmitting = false;
        if (!res.success) {
          this.toast.show('Order could not be placed. Please try again.', 'error');
          return;
        }

        const notice = this.isDemoMode
          ? `Demo order ${res.orderNumber} created. It was not sent to a live store.`
          : `Order ${res.orderNumber} placed. Pay cash when it is delivered.`;
        this.toast.show(notice, 'info');
        this.cart.clearCart();
        this.router.navigate([this.router.url.startsWith('/store') ? '/store/orders' : '/app/orders']);
      },
      error: () => {
        this.isSubmitting = false;
        this.toast.show('Could not place the order. Please try again later.', 'error');
      }
    });
  }
}
