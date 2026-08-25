import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/services/product.service';
import { OrderService } from '../../core/services/order.service';
import { GridColumn, getDiscountedPrice } from '../../core/models';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';
import { DataGridComponent } from '../../shared/components/data-grid/data-grid.component';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, StatCardComponent, DataGridComponent],
  templateUrl: './reports.component.html',
  styleUrls: []
})
export class ReportsComponent implements OnInit {
  loading = signal(true);
  topProductsRows = signal<Record<string, unknown>[]>([]);
  totalRevenue = signal(0);
  totalOrders = signal(0);
  avgOrderValue = signal(0);

  columns: GridColumn<unknown>[] = [
    { field: 'name', label: 'Product', sortable: true, type: 'text' },
    { field: 'brand', label: 'Brand', sortable: true, type: 'text' },
    { field: 'price', label: 'Price', sortable: true, type: 'currency' },
    { field: 'soldCount', label: 'Units Sold', sortable: true, type: 'number' },
    { field: 'revenue', label: 'Revenue', sortable: true, type: 'currency' },
  ];

  constructor(private productService: ProductService, private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(orders => {
      this.totalOrders.set(orders.length);
      const total = orders.reduce((s, o) => s + o.total, 0);
      this.totalRevenue.set(total);
      this.avgOrderValue.set(orders.length ? Math.round(total / orders.length) : 0);
    });

    this.productService.getProducts().subscribe(products => {
      const top = [...products].sort((a, b) => b.soldCount - a.soldCount).slice(0, 20);
      this.topProductsRows.set(top.map(p => ({
        name: p.name,
        brand: p.brand,
        price: getDiscountedPrice(p),
        soldCount: p.soldCount,
        revenue: getDiscountedPrice(p) * p.soldCount
      })));
      this.loading.set(false);
    });
  }
}
