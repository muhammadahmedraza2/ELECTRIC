import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { SalesService } from '../services/sales.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: []
})
export class CartComponent {
  constructor(public cart: CartService, private sales: SalesService, private router: Router) {}

  checkout() {
    if (this.cart.cartLines().length === 0) return;
    this.sales.recordSale(this.cart.cartLines());
    this.cart.clearCart();
    this.router.navigate(['/sales']);
  }
}
