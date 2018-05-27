import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';

@Injectable()
export class ContactService {

  constructor(private db: AngularFireDatabase) { }
  contacts: FirebaseListObservable<any>

  createContact(contact) {
  	return this.db.list('/contacts').push(contact);
  }

}
