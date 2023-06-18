import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { StorageRecord } from "../types/types";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private angularFirestore: AngularFirestore) { }

  getStorageDoc(id: string | undefined) {
    return this.angularFirestore
      .collection("storage")
      .doc(id)
      .valueChanges();
  }

  getSorageList() {
    return this.angularFirestore
      .collection("storage")
      .snapshotChanges();
  }

  createRecord(document: StorageRecord) {
    return new Promise<any>((resolve, reject) => {
      this.angularFirestore
        .collection("storage")
        .add({
          user: document.user,
          fileName: document.fileName,
          jsonContent: document.jsonContent
        })
        .then(
          response => {
            console.log(response);
          },
          error => reject(error))
    })
  }

  delete(document: StorageRecord) {
    return this.angularFirestore
      .collection("storage")
      .doc(document.id)
      .delete();
  }

}
