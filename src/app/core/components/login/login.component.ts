import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  formErrors = {
    'email': '',
    'password': ''
  };
  validationMessages = {
    'email': {
      'required': 'Email is required.',
      'email': 'Please provide registered email.'
    },
    'password': {
      'required': 'Password is required.',
      'pattern': 'Password must include at lease one letter and one number.',
      'minlength': 'Password must be at least 6 characters long.',
      'maxlength': 'Password can not be more than 25 characters long.'
    }
  };

  constructor(private authService: AuthService,
  						private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.buildForm();
  }

  // ========= Email Login ========== //
  signInWithEmail() {
    this.authService.emailLogin(this.userForm.value['email'], this.userForm.value['password']);
  }

  buildForm(): void {
    this.userForm = this.formBuilder.group({
      'email': ['', [
        Validators.required,
        Validators.email
      ]],
      'password': ['', [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25)
      ]]
    });

    this.userForm.valueChanges.subscribe(data => this.OnValueChanged(data));
    this.OnValueChanged(); // reset validation messages
  }

  // Update validation state on form changes.
  OnValueChanged(data?: any) {
    if(!this.userForm) { return; }

    const form = this.userForm;
    for(const field in this.formErrors) {
      if(Object.prototype.hasOwnProperty.call(this.formErrors, field)) {
        // clear previous error messages (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if(control && control.touched && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for(const key in control.errors) {
            if(Object.prototype.hasOwnProperty.call(control.errors, key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  // =========Social Login========== //

  signInWithGoogle(): void {
  	this.authService.googleLogin()
  		.then(() => {
  			this.afterSignIn();
  		})
  }

  signInWithFacebook(): void {
  	this.authService.facebookLogin()
  		.then(() => {
  			this.afterSignIn();
  		})
  }

  signInWithTwitter(): void {
  	this.authService.twitterLogin()
  		.then(() => {
  			this.afterSignIn();
  		})
  }

  // =========Anonymous Sign In========== //
  signInAnonymously() {
  	this.authService.anonymousLogin()
  		.then(() => this.afterSignIn());
  }

  // =========Routing after login======== //

  private afterSignIn(): void {
  	// Do after login stuff here, such router redirects, toast messages, etc.
  	this.router.navigate(['/']);
  }


}
