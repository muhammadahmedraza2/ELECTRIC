import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { CategoryService } from '../../../core/services/category.service';
import { Product } from '../../../core/models';
import { ProductGridComponent } from '../../../shared/components/product-grid/product-grid.component';

@Component({
  selector: 'app-category-page',
  standalone: true,
  imports: [CommonModule, ProductGridComponent],
  templateUrl: './category-page.component.html',
  styleUrls: []
})
export class CategoryPageComponent implements OnInit {
  loading = signal(true);
  products = signal<Product[]>([]);
  pageTitle = signal('All Products');

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      this.loading.set(true);

      if (slug) {
        const { categoryName, subCategoryName } = this.categoryService.findByAnySlug(slug);
        this.pageTitle.set(subCategoryName || categoryName);
        this.productService.getProductsByCategoryOrSub(slug).subscribe(list => {
          this.products.set(list);
          this.loading.set(false);
        });
      } else {
        this.pageTitle.set('All Products');
        this.productService.getProducts().subscribe(list => {
          this.products.set(list);
          this.loading.set(false);
        });
      }
    });
  }
}
