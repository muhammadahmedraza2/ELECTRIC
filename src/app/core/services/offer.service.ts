import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiBaseService } from './api-base.service';
import { API_CONFIG } from '../constants/api-config';
import { OFFERS } from '../data/offers.data';
import { Offer, isOfferCurrentlyActive } from '../models';

@Injectable({ providedIn: 'root' })
export class OfferService {

  constructor(private api: ApiBaseService) {}

  getAllOffers(): Observable<Offer[]> {
    return this.api.GetData<Offer[]>(API_CONFIG.endpoints.offers, OFFERS);
  }

  getActiveOffers(): Observable<Offer[]> {
    return this.getAllOffers().pipe(map(list => list.filter(isOfferCurrentlyActive)));
  }
}
