import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../core/services/order.service';
import { GridColumn, Order } from '../../core/models';
import { DataGridComponent } from '../../shared/components/data-grid/data-grid.component';
import { ToastService } from '../../core/services/toast.service';
import { BUSINESS_TYPES } from '../../core/data/business-types.data';
import { DemoSessionService } from '../../core/services/demo-session.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, DataGridComponent],
  templateUrl: './orders.component.html',
  styleUrls: []
})
export class OrdersComponent implements OnInit {
  private readonly session = inject(DemoSessionService);
  readonly activeBusiness = computed(() => BUSINESS_TYPES.find(type => type.id === this.session.session()?.businessTypeId) ?? null);
  loading = signal(true);
  rows = signal<Record<string, unknown>[]>([]);

  columns: GridColumn<unknown>[] = [
    { field: 'orderNumber', label: 'Order #', sortable: true, type: 'text' },
    { field: 'customerName', label: 'Customer', sortable: true, type: 'text' },
    { field: 'date', label: 'Date', sortable: true, type: 'date' },
    { field: 'itemCount', label: 'Items', sortable: true, type: 'number' },
    { field: 'total', label: 'Total', sortable: true, type: 'currency' },
    { field: 'status', label: 'Status', sortable: true, type: 'status' },
  ];

  constructor(private orderService: OrderService, private toast: ToastService) {}

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
      const statuses = ['Processing', 'Pending', 'Delivered'];
      this.rows.set(sampleProducts.map((product, index) => ({
        id: product.id,
        orderNumber: `${business.id.slice(0, 3).toUpperCase()}-10${42 + index}`,
        customerName: ['Ayesha Malik', 'Hamza Tariq', 'Sana Iqbal'][index % 3],
        date: new Date().toLocaleDateString(),
        itemCount: Math.min(index + 1, product.stock),
        total: (index + 1) * 2450,
        status: statuses[index % statuses.length],
        items: product.name
      })));
      this.loading.set(false);
      return;
    }

    this.orderService.getOrders().subscribe((orders: Order[]) => {
      this.rows.set(orders.map(o => ({
        id: o.id,
        orderNumber: o.orderNumber,
        customerName: o.customerName,
        date: new Date(o.date).toLocaleDateString(),
        itemCount: o.items.length,
        total: o.total,
        status: o.status
      })));
      this.loading.set(false);
    });
  }

  onView(row: Record<string, unknown>) {
    this.toast.show(`Order ${row['orderNumber']}: ${row['itemCount']} item(s), Rs ${row['total']}`, 'info');
  }
}
