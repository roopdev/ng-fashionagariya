import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DataTableModule } from 'angular-4-data-table';

import { SharedModule } from './../shared/shared.module';

import { AdminAuthGuard } from './services/admin-auth.guard';
import { AuthGuard } from './../shared/services/auth.guard';

import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminBlogsComponent } from './components/admin-blogs/admin-blogs.component';
import { BlogFormComponent } from './components/blog-form/blog-form.component';


@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([
    	{ 
    		path: 'admin/products/new', 
    		component: ProductFormComponent, 
    		canActivate: [AuthGuard, AdminAuthGuard] 
    	},
    	{ 
    		path: 'admin/products/:id', 
    		component: ProductFormComponent, 
    		canActivate: [AuthGuard, AdminAuthGuard] 
    	},
    	{ 
    		path: 'admin/products', 
    		component: AdminProductsComponent, 
    		canActivate: [AuthGuard, AdminAuthGuard] 
    	},
    	{ 
    		path: 'admin/orders', 
    		component: AdminOrdersComponent, 
    		canActivate: [AuthGuard, AdminAuthGuard] 
    	},
      { 
        path: 'admin/blogs/new', 
        component: BlogFormComponent, 
        canActivate: [AuthGuard, AdminAuthGuard] 
      },
      { 
        path: 'admin/blogs/:id', 
        component: BlogFormComponent, 
        canActivate: [AuthGuard, AdminAuthGuard] 
      },
      { 
        path: 'admin/blogs', 
        component: AdminBlogsComponent, 
        canActivate: [AuthGuard, AdminAuthGuard] 
      }
    ]),
  ],
  declarations: [
  	ProductFormComponent,
  	AdminProductsComponent,
  	AdminOrdersComponent,
  	AdminBlogsComponent,
  	BlogFormComponent
  ],
  providers: [
    AdminAuthGuard
  ],
})
export class AdminModule { }
