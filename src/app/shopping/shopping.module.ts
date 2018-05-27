import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from '../shared/services/auth.guard';

import { CheckOutComponent } from './components/check-out/check-out.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductFilterComponent } from './components/products/product-filter/product-filter.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ShoppingCartSummaryComponent } from './components/shopping-cart-summary/shopping-cart-summary.component';
import { ProductSingleComponent } from './components/products/product-single/product-single.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'product/:id', component: ProductSingleComponent },
      { path: 'products', component: ProductsComponent},
    	{ path: 'shopping-cart', component: ShoppingCartComponent },
    	{ path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard] },
    	{ path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuard] },
    	{ path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard] }
    ])
  ],
  declarations: [
  	ProductsComponent,
  	ShoppingCartComponent,
  	CheckOutComponent,
  	OrderSuccessComponent,
  	MyOrdersComponent,
  	ProductFilterComponent,
  	ShoppingCartSummaryComponent,
  	ShippingFormComponent,
  	ProductSingleComponent
  ]
})
export class ShoppingModule { }
