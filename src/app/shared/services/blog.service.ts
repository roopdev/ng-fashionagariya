import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase';
import { Blog } from '../models/blog.model';

@Injectable()
export class BlogService {

  folder: any;

  constructor(private db: AngularFireDatabase) { this.folder = 'blogImgs' }

  createBlog(blog, user) {
    let timestamp = firebase.database.ServerValue.TIMESTAMP;
    let dateCreated = new Date().getTime();
    //Create root ref 
    let storageRef = firebase.storage().ref();
    for(let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]) {
      let path = `/${this.folder}/${selectedFile.name}`;
      let iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapshot) => {
        console.log(snapshot);
        blog.imageUrl = snapshot.downloadURL;
        blog.imageName = selectedFile.name;
        blog.imagePath = path;
        this.db.list('/blogs').push({ blog, user, dateCreated, timestamp });
      }).catch((error) => console.log(error));
    }


    // let timestamp = firebase.database.ServerValue.TIMESTAMP;
    // let dateCreated = new Date().getTime();
    // const ref = this.db.list('/blogs');
    // const promise = ref.push({ timestamp, blog, user, dateCreated } );
    // const key = promise.key;
    // // After successfull push, get timesstamp and overwrite with negative value
    // promise.then(_ => {
    //   this.db.object('/blogs/' + key)
    //       .take(1)
    //       .do(post => {
    //         timestamp = post.timestamp * -1
    //         this.db.list('/blogs').update(key, { timestamp })
    //       })
    //       .subscribe()
    // })
  }

  getAll() {
    return this.db.list('/blogs');
  }

  get4Blog() {
    return this.db.list('/blogs', {
      query: {
        limitToLast: 4
      }
    })
  }

  getBlog(blogId: string) {
    return this.db.object('/blogs/' + blogId);
  }

  updateBlog(blogId, blog) {
    return this.db.object('/blogs/' + blogId).update(blog);
  }

  deleteBlog(blogId: string) {
    return this.db.object('/blogs/' + blogId).remove()
            .catch(errors => console.log(errors));
  }

}
  
