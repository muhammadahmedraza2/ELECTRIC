import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

export interface MenuNode {
  name: string;
  icon?: string;
  route?: string;
  children?: MenuNode[];
}

@Component({
  selector: 'app-inventory-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {

  @Output() nodeSelected = new EventEmitter<MenuNode>();

  openMenu = '';

  menuNodes: MenuNode[] = [

    {
      name: 'Home',
      icon: '⌂',
      route: '/home'
    },

    {
      name: 'Resend Request',
      icon: '📄',
      children: [
        { name: 'Resend Request', route: '/resend-request' },
        { name: 'Pending Request', route: '/resend-request/pending' },
        { name: 'Request Status', route: '/resend-request/status' }
      ]
    },

    {
      name: 'Instrument Processing',
      icon: '💵',
      children: [
        { name: 'Instrument Printing', route: '/instrument-printing' },
        { name: 'Instrument Processing', route: '/instrument-processing' },
        { name: 'Instrument Status', route: '/instrument-status' }
      ]
    },

    {
      name: 'Account Statement',
      icon: '▤',
      children: [
        { name: 'Account Statement', route: '/account-statement' },
        { name: 'Account Balance', route: '/account-balance' }
      ]
    },

    {
      name: 'Payment Transaction',
      icon: '💵',
      children: [
        { name: 'Create Transaction', route: '/payment/create' },
        { name: 'Transaction Status', route: '/payment/status' },
        { name: 'Bulk Transaction - Queue Base', route: '/payment/bulk' },
        { name: 'Repair Transaction', route: '/payment/repair' }
      ]
    },

    {
      name: 'Help',
      icon: '?',
      children: [
        { name: 'User Guide', route: '/help/guide' },
        { name: 'About', route: '/help/about' }
      ]
    },

    {
      name: 'Logout',
      icon: '⇥',
      route: '/logout'
    }

  ];

  toggleMenu(name: string): void {
    this.openMenu = this.openMenu === name ? '' : name;
  }

  selectNode(node: MenuNode): void {
    this.nodeSelected.emit(node);
  }
}