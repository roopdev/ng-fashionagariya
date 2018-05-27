import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap'

import { AuthService } from '../../../shared/services/auth.service';
import { OrderService } from '../../../shared/services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
	userId: string;
	orders$;
  showSpinner: boolean = true;

  constructor(private authService: AuthService,
  						private orderService: OrderService) { 
  	this.userId = this.authService.currentUserId;
		this.orders$ = this.orderService.getOrdersByUser(this.userId);
  }

  ngOnInit() {
  }

}
