import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ProductService } from '../../../../shared/services/product.service';
import { ShoppingCartService } from '../../../../shared/services/shopping-cart.service';
import { Product } from '../../../../shared/models/product.model';
import { ShoppingCart } from '../../../../shared/models/shopping-cart.model';

@Component({
  selector: 'app-product-single',
  templateUrl: './product-single.component.html',
  styleUrls: ['./product-single.component.css']
})
export class ProductSingleComponent implements OnInit {
	product: Product = null;
	productId;
	category: string;
  cart$: Observable<ShoppingCart>;

  constructor(private productService: ProductService,
  						private shoppingCartService: ShoppingCartService,
  						private route: ActivatedRoute) { }

  async ngOnInit() {
  	this.route.params.subscribe(params => {
  	      this.productId = params['id'];
  	    });
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProduct();
  }

  private populateProduct() {
    this.productService.get(this.productId)
      .subscribe(product => {
        this.product = product;
      });
  }

}
