import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { ProductService } from '../../../shared/services/product.service';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { Product } from '../../../shared/models/product.model';
import { ShoppingCart } from '../../../shared/models/shopping-cart.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
	products: Product[] = [];
	filteredProducts: Product[] = [];
	category: string;
  cart$: Observable<ShoppingCart>;
  showSpinner: boolean = true;
  

  constructor(private productService: ProductService,
  						private route: ActivatedRoute,
              private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProducts();
  }

  private populateProducts() {
    this.productService.getAll()
      .switchMap(products => {
        this.products = products;
        return this.route.queryParamMap;
      })
      .subscribe(params => {
        this.category = params.get('category');
        this.applyFilter();
        this.showSpinner = false; 
      });
  }

  private applyFilter() {
    this.filteredProducts = (this.category) ? 
      this.products.filter(p => p.category === this.category) :
      this.products;
  }

}
