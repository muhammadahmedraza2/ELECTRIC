import { Component, computed, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BUSINESS_TYPES } from '../../core/data/business-types.data';
import { CartService } from '../../core/services/cart.service';
import { DemoSessionService } from '../../core/services/demo-session.service';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-customer-layout',
  standalone: true,
  imports: [NgClass, RouterLink, RouterOutlet, FooterComponent],
  templateUrl: './customer-layout.component.html',
  styleUrls: []
})
export class CustomerLayoutComponent {
  private readonly session = inject(DemoSessionService);
  readonly activeBusiness = computed(() => BUSINESS_TYPES.find(type => type.id === this.session.session()?.businessTypeId) ?? null);

  constructor(public cart: CartService) {}
}