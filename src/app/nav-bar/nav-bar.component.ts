import { Component, OnInit } from '@angular/core';
import { AlertsService } from '../services/alerts.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  loggedinUser!: string
  constructor(private alertService: AlertsService) { }

  ngOnInit() {
  }
  onLogin() {
    this.loggedinUser = localStorage.getItem('token') as string;
    return this.loggedinUser;

  }
  onLogout() {
    localStorage.removeItem('token');
    this.alertService.success("Logged out succefully");
  }

}
