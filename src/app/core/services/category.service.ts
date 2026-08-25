import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiBaseService } from './api-base.service';
import { API_CONFIG } from '../constants/api-config';
import { CATEGORIES } from '../data/categories.data';
import { Category } from '../models';

@Injectable({ providedIn: 'root' })
export class CategoryService {

  constructor(private api: ApiBaseService) {}

  getCategories(): Observable<Category[]> {
    return this.api.GetData<Category[]>(API_CONFIG.endpoints.categories, CATEGORIES);
  }

  findByAnySlug(slug: string): { categoryName: string; subCategoryName: string } {
    for (const cat of CATEGORIES) {
      if (cat.slug === slug) return { categoryName: cat.name, subCategoryName: '' };
      const sub = cat.subCategories.find(s => s.slug === slug);
      if (sub) return { categoryName: cat.name, subCategoryName: sub.name };
    }
    return { categoryName: slug, subCategoryName: '' };
  }
}
