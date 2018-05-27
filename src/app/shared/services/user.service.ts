import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase';

import { User } from '../models/user.model';

@Injectable()
export class UserService {
	user: FirebaseObjectObservable<any>;

  constructor(private db: AngularFireDatabase) { }

  get(uid: string): FirebaseObjectObservable<User> {
  	return this.db.object('/users/' + uid);
  }

}
