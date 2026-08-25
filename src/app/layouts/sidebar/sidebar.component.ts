import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MenuNode } from '../../core/models';
import { MENU_CONFIG } from '../../core/constants/menu-config';
import { ThemeService } from '../../core/services/theme.service';

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

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class SidebarComponent {
  menu = MENU_CONFIG;
  searchTerm = signal('');
  expandedIds = signal<Set<number>>(new Set());

  filteredMenu = computed(() => filterMenu(this.menu, this.searchTerm().toLowerCase().trim()));
  isSearching = computed(() => this.searchTerm().trim().length > 0);

  constructor(public theme: ThemeService) {}

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
