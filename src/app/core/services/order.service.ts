import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiBaseService } from './api-base.service';
import { API_CONFIG } from '../constants/api-config';
import { ORDERS } from '../data/orders.data';
import { Order } from '../models';

@Injectable({ providedIn: 'root' })
export class OrderService {

  constructor(private api: ApiBaseService) {}

  getOrders(): Observable<Order[]> {
    return this.api.GetData<Order[]>(API_CONFIG.endpoints.orders, ORDERS);
  }

  createOrder(payload: Partial<Order>): Observable<{ success: boolean; orderNumber: string }> {
    const orderNumber = `ORD-${Date.now()}`;
    return this.api.PostData(API_CONFIG.endpoints.orderCreate, payload, { success: true, orderNumber });
  }
}
