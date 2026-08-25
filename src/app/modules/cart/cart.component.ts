import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { OrderService } from '../../core/services/order.service';
import { ToastService } from '../../core/services/toast.service';
import { getDiscountedPrice, Product } from '../../core/models';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, EmptyStateComponent],
  templateUrl: './cart.component.html',
  styleUrls: []
})
export class CartComponent {
  constructor(public cart: CartService, private orderService: OrderService, private toast: ToastService, private router: Router) {}

  lineTotal(product: Product, qty: number): number {
    return getDiscountedPrice(product) * qty;
  }

  checkout() {
    if (this.cart.cartItems().length === 0) return;
    const items = this.cart.cartItems().map(l => ({
      productId: l.product.id, name: l.product.name, brand: l.product.brand, quantity: l.quantity, price: getDiscountedPrice(l.product)
    }));
    this.orderService.createOrder({ items, total: this.cart.summary().grandTotal, status: 'Pending' }).subscribe(res => {
      this.toast.show(`Order ${res.orderNumber} placed successfully!`, 'success');
      this.cart.clearCart();
      this.router.navigate(['/app/orders']);
    });
  }
}
