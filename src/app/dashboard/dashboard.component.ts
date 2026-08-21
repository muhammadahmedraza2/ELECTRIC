import { AfterViewInit, Component, ElementRef, ViewChild, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { DataService, Item } from '../services/data.service';
import { CartService } from '../services/cart.service';
import { FavoritesService } from '../services/favorites.service';

Chart.register(...registerables);

type SortKey = 'name-asc' | 'price-asc' | 'price-desc' | 'stock-desc';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: [] // global styling only
})
export class DashboardComponent implements AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  totalItems = 0;
  totalCategories = 0;
  lowStockCount = 0;
  outOfStockCount = 0;

  searchTerm = signal('');
  activeCategory = signal<string>('all');
  sortBy = signal<SortKey>('name-asc');

  filteredItems = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const cat = this.activeCategory();
    const sort = this.sortBy();

    let list = this.data.items.filter(i => {
      const matchesCat = cat === 'all' || i.category === cat;
      const matchesTerm = !term || i.name.toLowerCase().includes(term) || i.brand.toLowerCase().includes(term);
      return matchesCat && matchesTerm;
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'stock-desc': return b.stock - a.stock;
        default: return a.name.localeCompare(b.name);
      }
    });

    return list;
  });

  constructor(public data: DataService, public cart: CartService, public fav: FavoritesService) {
    this.totalItems = this.data.items.length;
    this.totalCategories = this.data.categories.length;
    this.lowStockCount = this.data.items.filter(i => i.status === 'Low Stock').length;
    this.outOfStockCount = this.data.items.filter(i => i.status === 'Out of Stock').length;
  }

  ngAfterViewInit(): void {
    // Chart renders only here on the Dashboard page
    const labels = this.data.categories.map(c => c.name);
    const counts = this.data.categories.map(c => this.data.getItemsByCategory(c.slug).length);

    new Chart(this.chartCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Items per Category',
          data: counts,
          backgroundColor: '#6d5bf5',
          borderRadius: 8,
          maxBarThickness: 34
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { autoSkip: false, maxRotation: 70, minRotation: 70 } },
          y: { beginAtZero: true, ticks: { precision: 0 }, grid: { color: 'rgba(150,150,170,0.12)' } }
        }
      }
    });
  }

  setCategory(slug: string) {
    this.activeCategory.set(slug);
  }

  setSort(event: Event) {
    this.sortBy.set((event.target as HTMLSelectElement).value as SortKey);
  }

  add(item: Item) {
    this.cart.addToCart(item, 1);
  }

  toggleFav(item: Item) {
    this.fav.toggle(item.id);
  }
}
