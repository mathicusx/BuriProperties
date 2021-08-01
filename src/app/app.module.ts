import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { Routes, RouterModule } from  '@angular/router'
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PropertyCardComponent } from './property/property-card/property-card.component';
import { PropertyListComponent } from './property/property-list/property-list.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HousingService } from './services/housing.service';
import { AddPropertyComponent } from './property/add-property/add-property.component';
import { PropertyDetailComponent } from './property/property-detail/property-detail.component';
import { PropertyEditComponent } from './property/property-edit/property-edit.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UserLoginComponent } from './user/user-login/user-login.component';

const appRoutes: Routes = [// Each route is JS object with 2 Properties. path defines the URL, component defines our component for the path.
  {path: '', component: PropertyListComponent},
  {path: 'add-property', component: AddPropertyComponent},
  {path: 'rent-property', component: PropertyListComponent},
  {path: 'property-edit/:id', component: PropertyEditComponent},
  {path: 'property-details/:id', component: PropertyDetailComponent},
  {path: 'user-login', component: UserLoginComponent},
  {path: 'user-register', component: UserRegisterComponent},
  {path: '**', component: PropertyListComponent},

]

@NgModule({
  declarations: [
    AppComponent,
      PropertyCardComponent,
      PropertyListComponent,
      AddPropertyComponent,
      PropertyDetailComponent,
      PropertyEditComponent,
      NavBarComponent,
      UserRegisterComponent,
      UserLoginComponent,
   ],
  imports: [
    BrowserModule,
    HttpClientModule, // configures the dependency injector for the http client
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes) // Adds directives and providers for in-app navigation among views defined in an application.
  ],
  providers: [
    HousingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
