import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from './product.service';
import { Product } from './product.model';
import { AccordionSection } from '../accordion/accordion.component';
import { CanComponentDeactivate } from '../utility/can-deactivate.guard';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, CanComponentDeactivate {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  selectedCategory: string | undefined;
  isPrimary: boolean = true;
  accordionSections: AccordionSection[] = [{
    'open': false,
    title: 'Title 1',
    body: 'Body 1'
  }, {
    'open': true,
    title: 'Title 2',
    body: 'Body 2'
  }, {
    open: false,
    title: 'Title 3',
    body: 'Body 3'
  }];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
      this.filteredProducts = this.products;
      this.categories = this.getCategories();
    });
  }

  filterProducts(event: Event) {
    const category = (event.target as HTMLInputElement).value;
    this.selectedCategory = category;
    if (category) {
      this.filteredProducts = this.products.filter(product => product.category === category);
    } else {
      this.filteredProducts = this.products;
    }
  }

  getCategories(): string[] {
    return Array.from(new Set(this.products.map(product => product.category)));
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    // if (this.form.dirty) {
      return window.confirm(
        'You have unsaved changes. Do you really want to leave?'
      );
    // }
    // return true;
  }
}