import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { MenuNode } from '../../core/models';
import { MENU_CONFIG } from '../../core/constants/menu-config';
import { ThemeService } from '../../core/services/theme.service';
import { BUSINESS_TYPES } from '../../core/data/business-types.data';
import { DemoSessionService } from '../../core/services/demo-session.service';

function filterMenu(nodes: MenuNode[], term: string): MenuNode[] {
  if (!term) return nodes;
  const result: MenuNode[] = [];
  for (const node of nodes) {
    const selfMatches = node.name.toLowerCase().includes(term);
    const children = node.children ? filterMenu(node.children, term) : undefined;
    if (selfMatches || (children && children.length)) {
      result.push({ ...node, children: (children && children.length) ? children : node.children });
    }
  }
  return result;
}

const MODULE_ICONS: Record<string, string> = {
  'Products & Inventory': 'bi-box-seam',
  'Sales / POS': 'bi-cart-check',
  Purchases: 'bi-bag-plus',
  Suppliers: 'bi-truck',
  Customers: 'bi-people',
  Orders: 'bi-receipt',
  Invoices: 'bi-file-earmark-text',
  Accounts: 'bi-wallet2',
  Expenses: 'bi-cash-coin',
  Reports: 'bi-bar-chart-line',
  Settings: 'bi-gear'
};

function moduleSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class SidebarComponent {
  searchTerm = signal('');
  expandedIds = signal<Set<number>>(new Set());

  isSearching = computed(() => this.searchTerm().trim().length > 0);
  activeBusiness = computed(() => BUSINESS_TYPES.find(type => type.id === this.session.session()?.businessTypeId) ?? null);
  menu = computed<MenuNode[]>(() => {
    const business = this.activeBusiness();
    if (!business) return MENU_CONFIG;

    const moduleNodes = business.modules
      .filter(module => module !== 'Dashboard')
      .map((module, index) => ({
        id: index + 10,
        name: module,
        icon: MODULE_ICONS[module] ?? 'bi-stars',
        route: this.moduleRoute(module)
      }));

    return [
      { id: 1, name: 'Dashboard', icon: 'bi-grid-1x2', route: '/admin/dashboard' },
      { id: 2, name: 'Business Type', icon: 'bi-shop-window', route: '/setup/business-type' },
      ...moduleNodes
    ];
  });
  filteredMenu = computed(() => filterMenu(this.menu(), this.searchTerm().toLowerCase().trim()));

  constructor(public theme: ThemeService, private session: DemoSessionService, private router: Router) {}

  logout(): void {
    this.session.logout();
    void this.router.navigate(['/businesses']);
  }

  private moduleRoute(module: string): string {
    const routes: Record<string, string> = {
      'Products & Inventory': '/admin/products',
      Orders: '/admin/orders',
      Reports: '/admin/reports',
      Settings: '/admin/settings'
    };
    return routes[module] ?? `/admin/modules/${moduleSlug(module)}`;
  }

  toggleExpand(node: MenuNode, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    const set = new Set(this.expandedIds());
    set.has(node.id) ? set.delete(node.id) : set.add(node.id);
    this.expandedIds.set(set);
  }

  isExpanded(node: MenuNode): boolean {
    return this.isSearching() || this.expandedIds().has(node.id);
  }
}
