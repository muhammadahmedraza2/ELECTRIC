import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../core/services/order.service';
import { GridColumn, Order } from '../../core/models';
import { DataGridComponent } from '../../shared/components/data-grid/data-grid.component';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, DataGridComponent],
  templateUrl: './orders.component.html',
  styleUrls: []
})
export class OrdersComponent implements OnInit {
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
