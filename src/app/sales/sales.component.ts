import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesService } from '../services/sales.service';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sales.component.html',
  styleUrls: []
})
export class SalesComponent {
  expandedId: number | null = null;

  constructor(public sales: SalesService) {}

  toggle(id: number) {
    this.expandedId = this.expandedId === id ? null : id;
  }
}
