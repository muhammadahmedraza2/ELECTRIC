import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GridColumn } from '../../core/models';
import { BUSINESS_TYPES } from '../../core/data/business-types.data';
import { DemoSessionService } from '../../core/services/demo-session.service';
import { CategoryPageComponent } from '../../modules/products/category-page/category-page.component';
import { DataGridComponent } from '../../shared/components/data-grid/data-grid.component';

@Component({
  selector: 'app-business-inventory',
  standalone: true,
  imports: [CommonModule, RouterLink, DataGridComponent, CategoryPageComponent],
  templateUrl: './business-inventory.component.html',
  styleUrls: []
})
export class BusinessInventoryComponent {
  private readonly session = inject(DemoSessionService);

  readonly activeBusiness = computed(() => {
    const type = BUSINESS_TYPES.find(item => item.id === this.session.session()?.businessTypeId);
    return type?.id === 'electronics' ? null : type ?? null;
  });
  readonly detailFields = computed(() => {
    const business = this.activeBusiness();
    if (!business) return [];
    const standardFields = new Set(['brand', 'sku', 'stock', 'price']);
    return business.productFields.filter(field => {
      if (standardFields.has(field.key)) return false;
      return !business.sampleProducts || business.sampleProducts.some(product => product.attributes[field.key]);
    });
  });
  readonly columns = computed<GridColumn<unknown>[]>(() => {
    if (!this.activeBusiness()) return [];
    return [
      { field: 'name', label: 'Product', type: 'text', sortable: true },
      { field: 'category', label: 'Category', type: 'text', sortable: true },
      ...this.detailFields().map(field => ({ field: field.key, label: field.label, type: 'text' as const, sortable: true })),
      { field: 'stock', label: 'Stock', type: 'number', sortable: true }
    ];
  });
  readonly rows = computed<Record<string, unknown>[]>(() => {
    const business = this.activeBusiness();
    if (!business) return [];

    const products = business.sampleProducts ?? business.categories.slice(0, 3).map((category, index) => ({
      id: `${business.id}-${index + 1}`,
      name: category,
      category,
      stock: 12 + index * 4,
      attributes: {} as Record<string, string>
    }));

    return products.map(product => ({
      id: product.id,
      name: product.name,
      category: product.category,
      stock: product.stock,
      ...Object.fromEntries(this.detailFields().map(field => [field.key, product.attributes[field.key] ?? field.example ?? 'Not set']))
    }));
  });
}