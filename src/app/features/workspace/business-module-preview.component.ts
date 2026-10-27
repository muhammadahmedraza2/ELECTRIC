import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BUSINESS_TYPES } from '../../core/data/business-types.data';
import { BusinessTypeConfig } from '../../core/models/business-type.model';
import { DemoSessionService } from '../../core/services/demo-session.service';

function toSlug(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const MODULE_DESCRIPTIONS: Record<string, string> = {
  'Sales / POS': 'Record counter sales and review the product details used by this business profile.',
  Purchases: 'Review supplier purchasing workflows and profile-specific stock units.',
  Suppliers: 'Manage supplier relationships and the fields needed for incoming stock.',
  Customers: 'Manage customer records and connect them to orders and sales.',
  Invoices: 'Prepare invoices using this business profile and its configured catalog.',
  Accounts: 'Review account activity and the financial workflows enabled for this business.',
  Expenses: 'Track business expenses and related reporting workflows.'
};

@Component({
  selector: 'app-business-module-preview',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './business-module-preview.component.html',
  styleUrls: []
})
export class BusinessModulePreviewComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly session = inject(DemoSessionService);
  private readonly slug = signal(this.route.snapshot.paramMap.get('slug') ?? '');

  readonly activeBusiness = computed(() => BUSINESS_TYPES.find(type => type.id === this.session.session()?.businessTypeId) ?? null);
  readonly moduleName = computed(() => this.activeBusiness()?.modules.find(module => toSlug(module) === this.slug()) ?? null);
  readonly moduleDescription = computed(() => {
    const name = this.moduleName();
    return name ? MODULE_DESCRIPTIONS[name] ?? `${name} is enabled and configured for this business profile.` : '';
  });
  readonly business = computed<BusinessTypeConfig | null>(() => this.activeBusiness());
}