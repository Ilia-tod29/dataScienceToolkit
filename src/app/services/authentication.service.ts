import { Injectable } from '@angular/core';
import { from, Observable, of } from "rxjs";
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private auth: AngularFireAuth ) { }

  signIn(params: SignIn): Observable<any> {
    return from(this.auth.signInWithEmailAndPassword(params.email, params.password));
  }

}

type SignIn = {
  email: string;
  password: string;
}
