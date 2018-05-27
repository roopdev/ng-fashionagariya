import { Component, OnInit } from '@angular/core';

import { OrderService } from '../../../shared/services/order.service';
import { Order } from '../../../shared/models/order.model';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {
	orders$;

  constructor(private orderService: OrderService) { 
  	this.orders$ = this.orderService.getOrders();
  }
}
