import { Component, Input, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BUSINESS_TYPES } from '../../core/data/business-types.data';
import { DemoSessionService } from '../../core/services/demo-session.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: []
})
export class FooterComponent {
  @Input() storeMode = false;
  private readonly session = inject(DemoSessionService);
  readonly activeBusiness = computed(() => BUSINESS_TYPES.find(type => type.id === this.session.session()?.businessTypeId) ?? null);
  currentYear = new Date().getFullYear();
}
