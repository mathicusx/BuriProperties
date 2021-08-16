import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import {AlertsService } from 'src/app/services/alerts.service';
import { Router } from '@angular/router';
import { UserForLogin } from 'src/app/model/user';

@Component({
    selector: 'app-user-login',
    templateUrl: './user-login.component.html',
    styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {

  userToken!: UserForLogin;

    constructor(private authService: AuthService,
                private alerts: AlertsService,
                private router: Router) { }

    ngOnInit() {
    }

    onLogin(loginForm: NgForm) {
        console.log(loginForm.value);
        // const token = this.authService.authUser(loginForm.value);
        this.authService.authUser(loginForm.value).subscribe(
          (response: any) => {
            console.log(response);
            const user = response;
            if (user) {
                localStorage.setItem('token', user.token);
                localStorage.setItem('userName', user.userName);
                this.alerts.success('Login Successful');
                this.router.navigate(['/']);
            }
        }
        );
    }
}
