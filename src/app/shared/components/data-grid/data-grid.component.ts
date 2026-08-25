import { Component, Input, Output, EventEmitter, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GridColumn } from '../../../core/models';
import { LoadingComponent } from '../loading/loading.component';
import { EmptyStateComponent } from '../empty-state/empty-state.component';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-data-grid',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingComponent, EmptyStateComponent, PaginationComponent],
  templateUrl: './data-grid.component.html',
  styleUrls: []
})
export class DataGridComponent {
  private _rows = signal<Record<string, unknown>[]>([]);
  @Input() set rows(val: Record<string, unknown>[]) { this._rows.set(val || []); this.currentPage.set(1); }

  @Input() columns: GridColumn<unknown>[] = [];
  @Input() loading = false;
  @Input() showSearch = true;
  @Input() showActions = false;
  @Input() emptyMessage = 'No records found.';

  @Output() view = new EventEmitter<Record<string, unknown>>();
  @Output() edit = new EventEmitter<Record<string, unknown>>();
  @Output() delete = new EventEmitter<Record<string, unknown>>();

  searchTerm = signal('');
  sortField = signal<string | null>(null);
  sortAsc = signal(true);
  currentPage = signal(1);
  pageSize = signal(8);

  filteredRows = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    let list = this._rows();
    if (term) {
      list = list.filter(row => this.columns.some(col => String(row[col.field as string] ?? '').toLowerCase().includes(term)));
    }
    const field = this.sortField();
    if (field) {
      list = [...list].sort((a, b) => {
        const av = a[field]; const bv = b[field];
        if (typeof av === 'number' && typeof bv === 'number') return this.sortAsc() ? av - bv : bv - av;
        return this.sortAsc()
          ? String(av ?? '').localeCompare(String(bv ?? ''))
          : String(bv ?? '').localeCompare(String(av ?? ''));
      });
    }
    return list;
  });

  pagedRows = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.filteredRows().slice(start, start + this.pageSize());
  });

  sortBy(col: GridColumn<unknown>) {
    if (!col.sortable) return;
    const field = col.field as string;
    if (this.sortField() === field) {
      this.sortAsc.set(!this.sortAsc());
    } else {
      this.sortField.set(field);
      this.sortAsc.set(true);
    }
  }

  onPageChange(p: number) { this.currentPage.set(p); }
  onPageSizeChange(size: number) { this.pageSize.set(size); this.currentPage.set(1); }

  cellValue(row: Record<string, unknown>, col: GridColumn<unknown>): unknown {
    return row[col.field as string];
  }
}
