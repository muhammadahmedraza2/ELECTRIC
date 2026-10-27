import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/services/product.service';
import { OrderService } from '../../core/services/order.service';
import { GridColumn, getDiscountedPrice } from '../../core/models';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';
import { DataGridComponent } from '../../shared/components/data-grid/data-grid.component';
import { BUSINESS_TYPES } from '../../core/data/business-types.data';
import { DemoSessionService } from '../../core/services/demo-session.service';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, StatCardComponent, DataGridComponent],
  templateUrl: './reports.component.html',
  styleUrls: []
})
export class ReportsComponent implements OnInit {
  private readonly session = inject(DemoSessionService);
  readonly activeBusiness = computed(() => BUSINESS_TYPES.find(type => type.id === this.session.session()?.businessTypeId) ?? null);
  loading = signal(true);
  topProductsRows = signal<Record<string, unknown>[]>([]);
  totalRevenue = signal(0);
  totalOrders = signal(0);
  avgOrderValue = signal(0);

  columns = signal<GridColumn<unknown>[]>([
    { field: 'name', label: 'Product', sortable: true, type: 'text' },
    { field: 'brand', label: 'Brand', sortable: true, type: 'text' },
    { field: 'price', label: 'Price', sortable: true, type: 'currency' },
    { field: 'soldCount', label: 'Units Sold', sortable: true, type: 'number' },
    { field: 'revenue', label: 'Revenue', sortable: true, type: 'currency' },
  ]);

  constructor(private productService: ProductService, private orderService: OrderService) {}

  ngOnInit(): void {
    const business = this.activeBusiness();
    if (business && business.id !== 'electronics') {
      const sampleProducts = business.sampleProducts ?? business.categories.slice(0, 3).map((category, index) => ({
        id: `${business.id}-${index + 1}`,
        name: category,
        category,
        stock: 12 + index * 4,
        attributes: {} as Record<string, string>
      }));
      const detailFields = business.productFields.filter(field =>
        !['brand', 'sku', 'stock', 'price'].includes(field.key) && sampleProducts.some(product => product.attributes[field.key])
      );
      this.columns.set([
        { field: 'name', label: 'Product', sortable: true, type: 'text' },
        { field: 'category', label: 'Category', sortable: true, type: 'text' },
        ...detailFields.map(field => ({ field: field.key, label: field.label, sortable: true, type: 'text' as const })),
        { field: 'soldCount', label: 'Units Sold', sortable: true, type: 'number' },
        { field: 'revenue', label: 'Demo Revenue', sortable: true, type: 'currency' }
      ]);
      this.topProductsRows.set(sampleProducts.map((product, index) => {
        const soldCount = Math.max(1, Math.round(product.stock / 3));
        return {
          name: product.name,
          category: product.category,
          soldCount,
          revenue: soldCount * 1250,
          ...Object.fromEntries(detailFields.map(field => [field.key, product.attributes[field.key] ?? field.example ?? 'Not set']))
        };
      }));
      this.totalOrders.set(sampleProducts.length * 4);
      this.totalRevenue.set(this.topProductsRows().reduce((sum, product) => sum + Number(product['revenue']), 0));
      this.avgOrderValue.set(Math.round(this.totalRevenue() / this.totalOrders()));
      this.loading.set(false);
      return;
    }

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
