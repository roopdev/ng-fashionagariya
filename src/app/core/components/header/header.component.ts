import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as firebase from 'firebase';

import { AuthService } from '../../../shared/services/auth.service';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { User } from '../../../shared/models/user.model';
import { ShoppingCart } from '../../../shared/models/shopping-cart.model';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	navbarCollapsed = true;
	user: Observable<firebase.User>;
	userEmail: string;
	userName: string;
  cart$: Observable<ShoppingCart>;

  appUser: User;

  constructor(private authService: AuthService,
  						private router: Router,
              private flashMessage: FlashMessagesService,
              private shoppingCartService: ShoppingCartService) { 
    
  }

  async ngOnInit() {
  	// this.user = this.authService.authUser();
  	// this.user.subscribe(user => {
  	// 	if(user) {
  	// 		this.userEmail = user.email;
  	// 		this.userName = user.displayName;
  	// 	}
  	// });

    this.cart$ = await this.shoppingCartService.getCart();
    this.authService.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  logout() {
  	this.authService.signOut();
    this.flashMessage.show('You are logged out!', { cssClass: 'alert-success', timeout: 3000 });

  }

}
