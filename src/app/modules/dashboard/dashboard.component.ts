import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { DashboardService } from '../../core/services/dashboard.service';
import { ProductService } from '../../core/services/product.service';
import { OfferService } from '../../core/services/offer.service';
import { OrderService } from '../../core/services/order.service';
import { CategoryService } from '../../core/services/category.service';
import { DashboardSummary, Offer, Order, Product, GridColumn, getDiscountedPrice, getProductStatus } from '../../core/models';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';
import { OfferBannerComponent } from '../../shared/components/offer-banner/offer-banner.component';
import { DataGridComponent } from '../../shared/components/data-grid/data-grid.component';
import { LoadingComponent } from '../../shared/components/loading/loading.component';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, StatCardComponent, OfferBannerComponent, DataGridComponent, LoadingComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: []
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('categoryChart') categoryChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('orderChart') orderChartRef!: ElementRef<HTMLCanvasElement>;

  loading = signal(true);
  summary = signal<DashboardSummary | null>(null);
  activeOffers = signal<Offer[]>([]);
  products = signal<Product[]>([]);
  orders = signal<Order[]>([]);
  gridRows = signal<Record<string, unknown>[]>([]);

  columns: GridColumn<unknown>[] = [
    { field: 'name', label: 'Product', sortable: true, type: 'text' },
    { field: 'category', label: 'Category', sortable: true, type: 'text' },
    { field: 'brand', label: 'Brand', sortable: true, type: 'text' },
    { field: 'price', label: 'Price', sortable: true, type: 'currency' },
    { field: 'stock', label: 'Stock', sortable: true, type: 'number' },
    { field: 'status', label: 'Status', sortable: false, type: 'status' },
  ];

  constructor(
    private dashboardService: DashboardService,
    private productService: ProductService,
    private offerService: OfferService,
    private orderService: OrderService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dashboardService.getSummary().subscribe(s => this.summary.set(s));
    this.offerService.getActiveOffers().subscribe(o => this.activeOffers.set(o));
    this.orderService.getOrders().subscribe(o => this.orders.set(o));

    this.productService.getProducts().subscribe(products => {
      this.products.set(products);
      this.gridRows.set(products.slice(0, 60).map(p => ({
        id: p.id,
        name: p.name,
        category: p.category,
        brand: p.brand,
        price: getDiscountedPrice(p),
        stock: p.stock,
        status: getProductStatus(p.stock)
      })));
      this.loading.set(false);
    });
  }

  ngAfterViewInit(): void {
    // Charts render only on Dashboard, per requirement
    this.categoryService.getCategories().subscribe(categories => {
      this.productService.getProducts().subscribe(products => {
        const labels = categories.map(c => c.name);
        const counts = categories.map(c => products.filter(p => p.category === c.slug).length);

        new Chart(this.categoryChartRef.nativeElement, {
          type: 'bar',
          data: { labels, datasets: [{ label: 'Products', data: counts, backgroundColor: '#6d5bf5', borderRadius: 6, maxBarThickness: 34 }] },
          options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false }, title: { display: true, text: 'Category-wise Product Distribution' } },
            scales: { x: { grid: { display: false }, ticks: { maxRotation: 60, minRotation: 60 } }, y: { beginAtZero: true, ticks: { precision: 0 } } }
          }
        });
      });
    });

    this.orderService.getOrders().subscribe(orders => {
      const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
      const counts = statuses.map(s => orders.filter(o => o.status === s).length);

      new Chart(this.orderChartRef.nativeElement, {
        type: 'doughnut',
        data: {
          labels: statuses,
          datasets: [{ data: counts, backgroundColor: ['#f5a524', '#6d5bf5', '#3f8bff', '#17b26a', '#f04438'] }]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { position: 'bottom' }, title: { display: true, text: 'Orders Overview' } }
        }
      });
    });
  }

  onViewProduct(row: Record<string, unknown>) {
    this.router.navigate(['/app/product', row['id']]);
  }
}
