import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BUSINESS_TYPES } from '../../core/data/business-types.data';
import { BusinessTypeConfig } from '../../core/models/business-type.model';
import { DemoSessionService } from '../../core/services/demo-session.service';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-business-type-selector',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './business-type-selector.component.html',
  styleUrls: []
})
export class BusinessTypeSelectorComponent {
  private readonly formBuilder = inject(FormBuilder);
  readonly session = inject(DemoSessionService);
  private readonly theme = inject(ThemeService);
  private readonly router = inject(Router);

  readonly businessTypes = BUSINESS_TYPES;
  readonly groups = ['All types', 'Retail', 'Food & Fresh', 'Specialty'] as const;
  readonly selectedId = signal(this.session.session()?.businessTypeId ?? 'pharmacy');
  readonly activeGroup = signal<(typeof this.groups)[number]>('All types');
  readonly searchForm = this.formBuilder.nonNullable.group({ query: [''] });
  readonly selectedType = computed(() => this.businessTypes.find(type => type.id === this.selectedId()) ?? this.businessTypes[0]);

  get filteredTypes(): BusinessTypeConfig[] {
    const query = this.searchForm.controls.query.value.trim().toLowerCase();
    const group = this.activeGroup();
    return this.businessTypes.filter(type => {
      const matchesQuery = !query || `${type.name} ${type.description}`.toLowerCase().includes(query);
      const matchesGroup = group === 'All types' || type.group === group;
      return matchesQuery && matchesGroup;
    });
  }

  selectType(type: BusinessTypeConfig): void {
    this.selectedId.set(type.id);
  }

  useSelectedType(): void {
    const selected = this.selectedType();
    if (!this.session.isAuthenticated()) {
      void this.router.navigate(['/login'], { queryParams: { business: selected.id } });
      return;
    }

    this.session.setBusinessType(selected.id);
    this.theme.setTenantScope(`demo-${selected.id}`);
    this.theme.update({
      primaryColor: selected.defaultTheme.primaryColor,
      surfaceTone: selected.defaultTheme.surfaceTone
    });
    void this.router.navigate(['/admin/dashboard']);
  }

  logout(): void {
    this.session.logout();
    void this.router.navigate(['/login']);
  }
}