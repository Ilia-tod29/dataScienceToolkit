import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from "../services/authentication.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  @ViewChild('error') error: ElementRef | undefined;
  isRegistered: boolean = false;
  signUpObj = {
    email: "",
    password: "",
    repeatPassword: ""
  }
  signInObj = {
    email: "",
    password: ""
  }

  constructor(private authenticationService: AuthenticationService,
              private router: Router) { }

  ngOnInit(): void {
  }

  toggleRegister() {

  }

  submitSignUp(event: Event | undefined) {
    console.log(event);
  }

  submitSignIn(event: Event | undefined) {
    // event?.preventDefault();
    console.log(event);
    console.log(this.signInObj);

    this.authenticationService.signIn({
      email: this.signInObj.email,
      password: this.signInObj.password
    }).subscribe(() => {
      this.router.navigate(['home']);
    });

    console.log("debaa");
  }
}
