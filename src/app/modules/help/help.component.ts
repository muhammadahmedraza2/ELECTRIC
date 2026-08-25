import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FaqItem { q: string; a: string; }

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './help.component.html',
  styleUrls: []
})
export class HelpComponent {
  openIndex = signal<number | null>(0);

  faqs: FaqItem[] = [
    { q: 'How do I track my order?', a: 'Go to Orders from the sidebar to see the live status of every order you have placed.' },
    { q: 'What is your return policy?', a: 'Most products can be returned within 7 days of delivery if unused and in original packaging.' },
    { q: 'Do you offer installation services?', a: 'Yes, installation is available for TVs, ACs and major appliances at checkout.' },
    { q: 'What payment methods are supported?', a: 'We support cash on delivery, bank transfer and major debit/credit cards.' },
    { q: 'How long does delivery take?', a: 'Standard delivery takes 3-5 business days depending on your location.' },
  ];

  toggle(i: number) {
    this.openIndex.set(this.openIndex() === i ? null : i);
  }
}
