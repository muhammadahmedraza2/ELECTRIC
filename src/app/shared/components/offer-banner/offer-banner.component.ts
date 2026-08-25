import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Offer } from '../../../core/models';

@Component({
  selector: 'app-offer-banner',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './offer-banner.component.html',
  styleUrls: []
})
export class OfferBannerComponent {
  @Input() offer!: Offer;
}
