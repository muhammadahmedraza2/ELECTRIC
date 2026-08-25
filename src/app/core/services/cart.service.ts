import { Injectable, signal, computed, effect } from '@angular/core';
import { Product, CartItem, CartSummary, getDiscountedPrice } from '../models';

const CART_KEY = 'es_cart';
const DELIVERY_CHARGE = 250;

@Injectable({ providedIn: 'root' })
export class CartService {

  private items = signal<CartItem[]>(this.loadFromStorage());
  cartItems = computed(() => this.items());
  itemCount = computed(() => this.items().reduce((s, i) => s + i.quantity, 0));

  summary = computed<CartSummary>(() => {
    const lines = this.items();
    const subtotal = lines.reduce((s, l) => s + l.product.price * l.quantity, 0);
    const discount = lines.reduce((s, l) => s + (l.product.price - getDiscountedPrice(l.product)) * l.quantity, 0);
    const delivery = lines.length > 0 ? DELIVERY_CHARGE : 0;
    const grandTotal = subtotal - discount + delivery;
    return { subtotal, discount, deliveryCharges: delivery, grandTotal, itemCount: lines.length };
  });

  constructor() {
    effect(() => localStorage.setItem(CART_KEY, JSON.stringify(this.items())));
  }

  private loadFromStorage(): CartItem[] {
    try { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); } catch { return []; }
  }

  addToCart(product: Product, qty: number = 1) {
    const existing = this.items().find(i => i.product.id === product.id);
    if (existing) {
      this.updateQuantity(product.id, existing.quantity + qty);
    } else {
      this.items.update(list => [...list, { product, quantity: qty }]);
    }
  }

  updateQuantity(productId: number, qty: number) {
    if (qty <= 0) { this.removeFromCart(productId); return; }
    this.items.update(list => list.map(l => l.product.id === productId ? { ...l, quantity: qty } : l));
  }

  removeFromCart(productId: number) {
    this.items.update(list => list.filter(l => l.product.id !== productId));
  }

  clearCart() { this.items.set([]); }

  isInCart(productId: number): boolean {
    return this.items().some(l => l.product.id === productId);
  }
}
