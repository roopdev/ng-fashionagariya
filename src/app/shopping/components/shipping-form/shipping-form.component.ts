import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../shared/services/auth.service';
import { OrderService } from '../../../shared/services/order.service';

import { Order } from '../../../shared/models/order.model';
import { ShoppingCart } from '../../../shared/models/shopping-cart.model';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit {
	@Input('cart') cart: ShoppingCart;
 	shipping = {};
 	userId: string;

  constructor(private authService: AuthService,
  						private orderService: OrderService,
  						private router: Router) { }

  ngOnInit() {
  	this.userId = this.authService.currentUserId;
  }

  async placeOrder() {
  	let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }

}
