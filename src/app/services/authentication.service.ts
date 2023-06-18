import { Injectable } from '@angular/core';
import { from, Observable, of } from "rxjs";
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUser: string = "";

  constructor(private auth: AngularFireAuth ) { }

  validate(response: Object) {
    // @ts-ignore
    this.currentUser = response['user']['_delegate']['email'];
    // @ts-ignore
    localStorage.setItem('accessToken', response['user']['_delegate']['accessToken'])
  }

  get email(): string {
    return this.currentUser;
  }

  signIn(params: authParams): Observable<any> {
    return from(this.auth.signInWithEmailAndPassword(params.email, params.password));
  }

  signUp(params: authParams): Observable<any> {
    return from(this.auth.createUserWithEmailAndPassword(params.email, params.password));
  }

  signOut() {
    this.currentUser = "";
    localStorage.setItem('accessToken', "");
  }

}

type authParams = {
  email: string;
  password: string;
}
