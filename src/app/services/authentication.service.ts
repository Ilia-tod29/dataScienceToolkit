import { Injectable } from '@angular/core';
import { from, Observable, of } from "rxjs";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { authParams } from '../types/types'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private auth: AngularFireAuth ) { }

  validate(response: Object) {
    // @ts-ignore
    localStorage.setItem('currentUser', response['user']['_delegate']['email']);
    // @ts-ignore
    localStorage.setItem('accessToken', response['user']['_delegate']['accessToken']);
  }

  signIn(params: authParams): Observable<any> {
    return from(this.auth.signInWithEmailAndPassword(params.email, params.password));
  }

  signUp(params: authParams): Observable<any> {
    return from(this.auth.createUserWithEmailAndPassword(params.email, params.password));
  }

  signOut() {
    localStorage.setItem('currentUser', "");
    localStorage.setItem('accessToken', "");
  }

}
