import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase';

@Injectable()
export class ProductService {
  folder;

  constructor(private db: AngularFireDatabase) { this.folder = 'productImgs' }

  create(product) {
    let storageRef = firebase.storage().ref();
    for(let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]) {
      let path = `/${this.folder}/${selectedFile.name}`;
      let iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapshot) => {
        product.imageUrl = snapshot.downloadURL;
        product.imageName = selectedFile.name;
        product.imagePath = path;
        return this.db.list('/products').push(product);
      }).catch((error) => console.log(error));
    }
  	// return this.db.list('/products').push(product);
  }

  getAll() {
  	return this.db.list('/products');
  }

  get(productId) {
  	return this.db.object('/products/' + productId);
  }

  update(productId, product) {
    // let storageRef = firebase.storage().ref();
    // for(let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]) {
    //   let path = `/${this.folder}/${selectedFile.name}`;
    //   let iRef = storageRef.child(path);
    //   iRef.put(selectedFile).then((snapshot) => {
    //     product.imageUrl = snapshot.downloadURL;
    //     product.imageName = selectedFile.name;
    //     product.imagePath = path;
    //     return this.db.object('/products/' + productId).update(product);
    //   }).catch((error) => console.log(error));
    // }
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }

}
