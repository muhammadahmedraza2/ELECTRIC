import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-customer-layout',
  standalone: true,
  imports: [RouterLink, RouterOutlet, FooterComponent],
  templateUrl: './customer-layout.component.html',
  styleUrls: []
})
export class CustomerLayoutComponent {
  constructor(public cart: CartService) {}
}