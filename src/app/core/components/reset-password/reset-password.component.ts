import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private authService: AuthService,
  						private flashMessage: FlashMessagesService, 
  						private router: Router) { }

  ngOnInit() {
  }

  resetEmail(email) {
  	console.log(email);
  	// this.authService.resetPassword(email);
  	this.router.navigate(['/login']);
  	this.flashMessage.show('Reset password link is been send to your email!', { cssClass: 'alert-success', timeout: 3000 });
  }

}
