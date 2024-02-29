import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import {  GoogleLoginProvider, SocialAuthService, SocialUser } from "angularx-social-login";

import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
     private router : Router, 
     private toastr: ToastrService, 
     public oidcSecurityService: OidcSecurityService, 
     private http: HttpClient
     ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  

  ngOnInit() {
    this.oidcSecurityService
      .checkAuth()
      .subscribe((loginResponse: any) => {
        const { isAuthenticated, userData, accessToken, idToken, configId } =
          loginResponse;

        /*...*/
      });
  }

  // login() {
  //   this.oidcSecurityService.authorize();
  // }

  login() {
    this.http.get<any>(`http://localhost:3000/api/auth/google`).subscribe( val => 
      console.log(val))
  }


  hasError(controlName: string, errorName: string): boolean {
    return this.loginForm.get(controlName).hasError(errorName) && this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched;
  }

  onSubmit(){

  }

  // signInWithGoogle(): void {
  //   this.authSocialService.signIn(GoogleLoginProvider.PROVIDER_ID).then((user: SocialUser) => {
  //     this.authService.googleLogin(user).subscribe(
  //       (response : any) => {

  //         if(response.status == true){

  //           this.toastr.success(response.message , "Success");
  //           // why is it not giving me the result.
  //           localStorage.setItem('token', JSON.stringify(response.values['jwt_token']));
  //           localStorage.setItem('role' ,JSON.stringify(response.values['user']['role']) ); 

  //           this.router.navigate(['user_page']); 
  //         }
          
          
  //       },
  //       (error) => {
  //         console.log(error)
  //         this.toastr.error(error.error.message , "Failed")
  //       }
  //     )
  //   });
  // }


  // onSubmit() {
  //   if (this.loginForm.valid) {

  //     this.authService.login(this.loginForm.value).subscribe(
  //       (response : any) => {

  //         if(response.status == true){

  //           this.toastr.success(response.message , "Success");
  //           // why is it not giving me the result.
  //           localStorage.setItem('token', JSON.stringify(response.values['jwt_token']));
  //           localStorage.setItem('role' ,JSON.stringify(response.values['user']['role']) ); 

  //           this.router.navigate(['user_page']); 
  //         }
          
          
  //       },
  //       (error) => {
  //         console.log(error)
  //         this.toastr.error(error.error.message , "Failed")
  //       }
  //     )
  //   }
  // }

}
