import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './Sidebar/sidebar/sidebar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    Sidebar
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  currentYear = new Date().getFullYear();

  items: any[] = [];
  selectedCategory = '';

  onCategorySelected(category: string): void {
    this.selectedCategory = category;
  }
}