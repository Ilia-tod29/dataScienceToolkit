import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from "../services/authentication.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  @ViewChild('errorSignIn') errorSignInEl: ElementRef | undefined;
  @ViewChild('errorSignUp') errorSignUpEl: ElementRef | undefined;
  isRegistered: boolean = false;
  isLoading: boolean = false;
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
    this.isRegistered = !this.isRegistered;
  }

  submitSignUp() {
    console.log("sign up");
    if (this.signUpObj.password !== this.signUpObj.repeatPassword) {
      this.errorSignUpEl!.nativeElement.textContent = "Passwords do not match";
      return;
    }

    if (this.signUpObj.password.length < 8 || !this.hasCapitalLetter(this.signUpObj.password)) {
      this.errorSignUpEl!.nativeElement.textContent = "Password must have at least 8 symbols and a capital letter";
      return;
    }

    this.authenticationService.signUp({
      email: this.signUpObj.email,
      password: this.signUpObj.password
    }).subscribe({
      next: (response) => {
        this.authenticationService.validate(response);
        this.router.navigate(['home'])
      },
      error: error => {
        this.isLoading = false;
        this.errorSignUpEl!.nativeElement.textContent = error.message.slice(10);
      }
    });
  }

  submitSignIn() {
    console.log("sign in");
    this.isLoading = true;

    this.authenticationService.signIn({
      email: this.signInObj.email,
      password: this.signInObj.password
    }).subscribe({
      next: (response) => {
        this.authenticationService.validate(response);
        this.router.navigate(['home']);
      },
      error: error => {
        this.isLoading = false;
        this.errorSignInEl!.nativeElement.textContent = error.message.slice(10);
      }
    });
  }


  private hasCapitalLetter(input: string): boolean {
    const capitalLetterRegex = /[A-Z]/;
    return capitalLetterRegex.test(input);
  }
}
