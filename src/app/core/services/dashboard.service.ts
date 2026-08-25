import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiBaseService } from './api-base.service';
import { API_CONFIG } from '../constants/api-config';
import { ProductService } from './product.service';
import { OrderService } from './order.service';
import { OfferService } from './offer.service';
import { CategoryService } from './category.service';
import { DashboardSummary, getProductStatus } from '../models';

@Injectable({ providedIn: 'root' })
export class DashboardService {

  constructor(
    private api: ApiBaseService,
    private productService: ProductService,
    private orderService: OrderService,
    private offerService: OfferService,
    private categoryService: CategoryService
  ) {}

  getSummary(): Observable<DashboardSummary> {
    return combineLatest([
      this.productService.getProducts(),
      this.categoryService.getCategories(),
      this.orderService.getOrders(),
      this.offerService.getActiveOffers()
    ]).pipe(
      map(([products, categories, orders, offers]) => {
        const summary: DashboardSummary = {
          totalProducts: products.length,
          totalCategories: categories.length,
          totalOrders: orders.length,
          totalSales: orders.reduce((s, o) => s + o.total, 0),
          pendingOrders: orders.filter(o => o.status === 'Pending').length,
          lowStockProducts: products.filter(p => getProductStatus(p.stock) === 'Low Stock' || getProductStatus(p.stock) === 'Out of Stock').length,
          activeOffers: offers.length
        };
        return summary;
      })
    );
  }
}
