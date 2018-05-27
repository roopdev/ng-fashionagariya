import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { OrderService } from '../../../shared/services/order.service';
import { Order } from '../../../shared/models/order.model';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent {
	orderId: string;
	order$: any = {};

  constructor(private orderService: OrderService,
  						private route: ActivatedRoute) { 
    this.route.params.subscribe(params => {
          this.orderId = params['id'];
        });
    this.order$ = this.orderService.getOrder(this.orderId);
  }

}
