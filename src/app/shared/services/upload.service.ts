import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { Upload } from '../models/upload.model';

@Injectable()
export class UploadService {
	private blogPath: string = '/blogImgs';
	private uploads: FirebaseListObservable<Upload[]>;
	upload: Observable<Upload>;
	uploadFileUrl: string = '';

  constructor(private db: AngularFireDatabase) { }

  pushUpload(upload: Upload) {
  	let storageRef = firebase.storage().ref();
  	let uploadTask = storageRef.child(`${this.blogPath}/${upload.file.name}`).put(upload.file);

  	uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
  		(snapshot) => {
  			// upload in progress
  			upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
  			// console.log(upload.progress);
  		},
  		(error) => {
  			// upload failed
  			console.log(error)
  		},
  		(): any => {
  			// upload success.
  			upload.url = uploadTask.snapshot.downloadURL;
  			upload.name = upload.file.name;
  			this.saveFileData(upload);
  			this.uploadFileUrl = upload.url;
  		}
  	);
  	console.log(this.uploadFileUrl);
  	return this.uploadFileUrl;
  	
  }

  // writes the file details to the realtime db
  private saveFileData(upload: Upload) {
  	this.db.list(`${this.blogPath}/`).push(upload);
  	// console.log('File saved!!: ' + upload.url);
  }


  deleteUpload(upload: Upload) {
  	this.deleteFileData(upload.$key)
  		.then( () => {
  			this.deleteFileStorage(upload.name)
  		})
  		.catch(error => console.log(error))
  }

  // Deletes the file details from the realtime db
  private deleteFileData(key: string) {
  	return this.db.list(`${this.blogPath}/`).remove(key);
  }

  // Firebase files must have unique names in their respective stroage dir
  // so the name serves as a unique key
  private deleteFileStorage(name:string) {
  	let storageRef = firebase.storage().ref();
  	storageRef.child(`${this.blogPath}/${name}`).delete();
  }

}
