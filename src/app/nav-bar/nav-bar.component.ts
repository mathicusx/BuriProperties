import { Component, OnInit } from '@angular/core';
import { AlertsService } from '../services/alerts.service';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

    loggedinUser!: string;
    constructor(private alerts: AlertsService) { }

    ngOnInit() {
    }

    loggedin() {
        this.loggedinUser = localStorage.getItem('userName') as string;
        return this.loggedinUser;
    }

    onLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        this.alerts.success('You are logged out !');
    }

}
