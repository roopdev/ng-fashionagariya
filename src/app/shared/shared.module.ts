import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { DataTableModule } from 'angular-4-data-table/dist';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';

import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { UserService } from './services/user.service';
import { BlogService } from './services/blog.service';
import { UploadService } from './services/upload.service';
import { ContactService } from './services/contact.service';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ReversePipe } from './pipes/reverse.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    NgbModule.forRoot(),
    RouterModule,
    FlashMessagesModule
  ],
  declarations: [
  	ProductCardComponent,
  	ProductQuantityComponent,
  	LoadingSpinnerComponent,
  	ReversePipe
  ],
  exports: [
    LoadingSpinnerComponent,
  	ProductCardComponent,
  	ProductQuantityComponent,
    ReversePipe,
  	CommonModule,
  	FormsModule,
  	CustomFormsModule,
  	DataTableModule,
    FlashMessagesModule,
  	AngularFireDatabaseModule,
  	AngularFireAuthModule,
  	NgbModule.forRoot().ngModule
  ],
  providers: [
  	AuthService,
  	AuthGuard,
  	UserService,
  	CategoryService,
  	ProductService,
  	ShoppingCartService,
  	OrderService,
    BlogService,
    UploadService,
    ContactService
  ]
})
export class SharedModule { }
