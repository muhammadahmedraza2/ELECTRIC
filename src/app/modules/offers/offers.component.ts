import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferService } from '../../core/services/offer.service';
import { Offer, isOfferCurrentlyActive } from '../../core/models';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [CommonModule, LoadingComponent, EmptyStateComponent],
  templateUrl: './offers.component.html',
  styleUrls: []
})
export class OffersComponent implements OnInit {
  loading = signal(true);
  allOffers = signal<Offer[]>([]);

  activeOffers = computed(() => this.allOffers().filter(isOfferCurrentlyActive));
  upcomingOffers = computed(() => this.allOffers().filter(o => !isOfferCurrentlyActive(o) && new Date(o.startDate) > new Date()));
  expiredOffers = computed(() => this.allOffers().filter(o => !isOfferCurrentlyActive(o) && new Date(o.endDate) < new Date()));

  constructor(private offerService: OfferService) {}

  ngOnInit(): void {
    this.offerService.getAllOffers().subscribe(list => {
      this.allOffers.set(list);
      this.loading.set(false);
    });
  }
}
