import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataService } from './services/data.service';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: [] // No component-level CSS on purpose — everything is styled globally via src/styles.css
})
export class AppComponent {
  sidebarOpen = false;
  currentYear = new Date().getFullYear();

  constructor(public data: DataService, public cart: CartService) {}

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
