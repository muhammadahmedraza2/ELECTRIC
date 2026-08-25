import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { API_CONFIG } from '../constants/api-config';

/**
 * Base API service — every domain service (Product, Order, Offer, etc.)
 * uses this instead of injecting HttpClient directly in components.
 *
 * Today: useMockData = true, so calls resolve from local mock data.
 * Tomorrow: flip API_CONFIG.useMockData = false and these methods
 * will call the real backend with zero changes needed in components.
 */
@Injectable({ providedIn: 'root' })
export class ApiBaseService {

  constructor(private http: HttpClient) {}

  GetData<T>(endpoint: string, mockData: T, payload?: unknown): Observable<T> {
    if (API_CONFIG.useMockData) {
      return of(mockData).pipe(delay(350));
    }
    return this.http.post<T>(`${API_CONFIG.apiBaseUrl}/${endpoint}`, payload || {});
  }

  PostData<T>(endpoint: string, payload: unknown, mockResponse: T): Observable<T> {
    if (API_CONFIG.useMockData) {
      return of(mockResponse).pipe(delay(300));
    }
    return this.http.post<T>(`${API_CONFIG.apiBaseUrl}/${endpoint}`, payload);
  }

  Update<T>(endpoint: string, payload: unknown, mockResponse: T): Observable<T> {
    if (API_CONFIG.useMockData) {
      return of(mockResponse).pipe(delay(300));
    }
    return this.http.put<T>(`${API_CONFIG.apiBaseUrl}/${endpoint}`, payload);
  }

  Delete<T>(endpoint: string, mockResponse: T): Observable<T> {
    if (API_CONFIG.useMockData) {
      return of(mockResponse).pipe(delay(300));
    }
    return this.http.delete<T>(`${API_CONFIG.apiBaseUrl}/${endpoint}`);
  }
}
