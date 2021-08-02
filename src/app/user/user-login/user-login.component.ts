import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { IUser } from 'src/app/model/IUser';
import { AlertsService } from 'src/app/services/alerts.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
    user!: IUser;
  submitted = false; // this property helps us to check whether the form is submitted or not.

  constructor(private authService: AuthService,
              private alertService: AlertsService,
              private router: Router) { }

  ngOnInit() {
  }

  onLogin(loginForm: NgForm) {
    console.log(loginForm.value);
    const token =  this.authService.authUser(loginForm.value);
    if(token) {
      localStorage.setItem('token', token.userName);
      console.log("login succesfull");
      this.alertService.success('Logged in succefully');
      this.router.navigate(['/']);
    }else {
      console.log('not logged in');
      this.alertService.error('Wrong credentials');
    }


  }

  onRegister() {

  }

}
