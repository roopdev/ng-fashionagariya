import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';

import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthService {

	public user: Observable<firebase.User>;
	displayName: string = '';
	authState: any = null;
  newUser: {};

  constructor(private afAuth: AngularFireAuth,
  						private db: AngularFireDatabase,
  						private router: Router,
              private userService: UserService) { 

  	this.afAuth.authState.subscribe((auth) => {
  		this.authState = auth;
  	});
  	this.user = afAuth.authState;
  }

  authUser() {
  	return this.user;
  }

  // Return true if user is logged in
  get authenticated(): boolean {
  	return this.authState != null;
  }

  // Returns current user data
  get currentUser(): any {
  	return this.authenticated ? this.authState : null;
  }

  // Returns current user authState
  get currentUserObservable(): any {
  	return this.afAuth.authState;
  }

  // Returns current user UID
  get currentUserId(): string {
  	return this.authenticated ? this.authState.uid : '';
  }

  // Returns if current user is Anonymous User
  get currentUserAnonymous(): boolean {
  	return this.authenticated ? this.authState.isAnonymous : false;
  }

  // Returns current user displayName or Guest
  get currentUserDisplayName(): string {
  	if(!this.authState) {
  		return 'Guest'
  	} else if(this.currentUserAnonymous) {
  		return 'GuestUser'
  	} else {
  		return this.authState['displayName'] || this.authState['email'];
  	}
  }

  get currentUserPhoto(): string {
    if(!this.authState) {
      return '';
    } else if(this.currentUserAnonymous) {
      return 'https://firebasestorage.googleapis.com/v0/b/fashionnagariya.appspot.com/o/profileImg%2Fblank-profile.png?alt=media&token=5245fbff-1347-4de6-a404-856489e12c75';
    } else {
      return this.authState['photoURL'] || 'https://firebasestorage.googleapis.com/v0/b/fashionnagariya.appspot.com/o/profileImg%2Fblank-profile.png?alt=media&token=5245fbff-1347-4de6-a404-856489e12c75';
    }
  }


  // ========SOCIAL AUTH========== // 

  googleLogin() {
  	const provider = new firebase.auth.GoogleAuthProvider();
  	return this.socialSignIn(provider);
  }

  facebookLogin() {
  	const provider = new firebase.auth.FacebookAuthProvider();
  	return this.socialSignIn(provider);
  }

  twitterLogin() {
  	const provider = new firebase.auth.TwitterAuthProvider();
  	return this.socialSignIn(provider);
  }

  private socialSignIn(provider) {
  	return this.afAuth.auth.signInWithPopup(provider)
  					.then((credential) => {
  						this.authState = credential.user
  						this.updateUserData();
  					})
  					.catch(error => console.log(error));
  }

  // ==========Anonymous Auth========= //
  anonymousLogin() {
  	return this.afAuth.auth.signInAnonymously()
  					.then((user) => {
  						this.authState = user;
  						this.updateUserData();
  					})
  					.catch(error => console.log(error));
  }

  // ===========Email/Password Auth=========== //
  emailSignUp(email: string, password: string, displayName: string) {
  	return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
  					.then((user) => {
  						this.authState = user;
              this.displayName = displayName;
  						this.updateUserData();
  						this.router.navigate(['/']);
  					})
  					.catch(error => console.log(error));
  }

  emailLogin(email: string, password: string) {
  	return this.afAuth.auth.signInWithEmailAndPassword(email, password)
  					.then((user) => {
  						this.authState = user;
  						this.router.navigate(['/']);
  					})
  					.catch(error => console.log(error));
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
  	var auth = firebase.auth();

  	return auth.sendPasswordResetEmail(email)
  					.then(() => console.log("email send"))
  					.catch((error) => console.log(error));
  }

  // ==========Sign Out=========== //
  signOut(): void {
  	this.afAuth.auth.signOut();
  	this.updateStatus();
  	this.router.navigate(['/']);
  }

  // ==========Helpers============ //
  private updateUserData(): void {
  	// Writes user name and email to realtime database
  	// useful if your app displays information about users or for admin features or status

  	let path = `users/${this.currentUserId}`; // Endpoint on firebase
  	let data = {
  		email: this.authState.email,
  		name: this.authState.displayName, // || this.displayName,
      photoURL: this.authState.photoURL,
  		status: 'online',
      isAdmin: false,
  		// roles: { reader: true, author: false, admin: false }
  	}
    console.log(data);
  	this.db.object(path).update(data)
  		.catch(error => console.log(error));

  }

  private updateStatus(): void {
  	let path = `users/${this.currentUserId}`;
  	let data = {
  		status: 'offline'
  	}
  	this.db.object(path).update(data)
  		.catch(error => console.log(error));

  	if(this.currentUserAnonymous) {
  		this.db.object(path).remove();
  	}

    console.log(data);

  }

  get appUser$(): Observable<User> {
    return this.afAuth.authState
            .switchMap(user => {
              if(user) { return this.userService.get(user.uid); }

              return Observable.of(null);
            });
  }

}
