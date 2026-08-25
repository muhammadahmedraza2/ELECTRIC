import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiBaseService } from './api-base.service';
import { API_CONFIG } from '../constants/api-config';
import { PRODUCTS } from '../data/products.data';
import { Product } from '../models';

@Injectable({ providedIn: 'root' })
export class ProductService {

  constructor(private api: ApiBaseService) {}

  /** All products — components should never touch mock data directly. */
  getProducts(): Observable<Product[]> {
    return this.api.GetData<Product[]>(API_CONFIG.endpoints.products, PRODUCTS);
  }

  getProductsByCategoryOrSub(slug: string): Observable<Product[]> {
    return this.getProducts().pipe(
      map(list => list.filter(p => p.category === slug || p.subCategory === slug))
    );
  }

  getProductById(id: number): Observable<Product | undefined> {
    return this.getProducts().pipe(map(list => list.find(p => p.id === id)));
  }

  getFeaturedProducts(limit = 8): Observable<Product[]> {
    return this.getProducts().pipe(map(list => list.filter(p => p.isFeatured).slice(0, limit)));
  }

  getBrandsForList(products: Product[]): string[] {
    return Array.from(new Set(products.map(p => p.brand))).sort();
  }
}
