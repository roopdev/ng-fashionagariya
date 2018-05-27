import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	userForm: FormGroup;
	formErrors = {
		'email': '',
		'password': '',
		'displayName': ''
	};
	validationMessages = {
		'email': {
			'required': 'Email is required.',
			'email': 'Please enter valid email address.'
		},
		'password': {
			'required': 'Password is required.',
			'pattern': 'Password must include at least one letter and one number.',
			'minlength': 'Password must be at least 6 characters long',
			'maxlength': 'Password can not be more than 25 characters long.'
		},
		'displayName': {
			'required': 'User Display Name is required',
			'minlength': 'Display name must be at least 4 characters long',
			'maxlength': 'Display name can not be more than 10 characters long'
		}
	};

  constructor(private authService: AuthService,
  						private formBuilder: FormBuilder) { }

  ngOnInit() {
  	this.buildForm();
  }

  register(): void {
  	this.authService.emailSignUp(this.userForm.value['email'], this.userForm.value['password'], this.userForm.value['displayName']);
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
  		]],
  		'displayName': ['', [
  			Validators.required,
  			Validators.minLength(4),
  			Validators.maxLength(10)
  		]]
  	});

  	this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
  	this.onValueChanged(); // reset validation messages
  }

  // Update validation state on form changes.
  onValueChanged(data?: any) {
  	if(!this.userForm) {
  		return;
  	}
  	const form = this.userForm;
  	for(const field in this.formErrors) {
  		if(Object.prototype.hasOwnProperty.call(this.formErrors, field)) {
  			// clear previous error message (if any)
  			this.formErrors[field] = '';
  			const control = form.get(field);
  			if(control && control.dirty && !control.valid) {
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

}
