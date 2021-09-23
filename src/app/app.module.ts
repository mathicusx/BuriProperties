import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { Routes, RouterModule } from  '@angular/router'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { NgxDropzoneModule } from 'ngx-dropzone';



import { AppComponent } from './app.component';
import { PropertyCardComponent } from './property/property-card/property-card.component';
import { PropertyListComponent } from './property/property-list/property-list.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HousingService } from './services/housing.service';
import { AddPropertyComponent } from './property/add-property/add-property.component';
import { PropertyDetailComponent } from './property/property-detail/property-detail.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { AuthService } from './services/auth.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FilterPipe } from './pipes/filter.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { HttpErrorInterceptorService } from './services/httperor-interceptor.service';
import { AlertsService } from './services/alerts.service';
import { PropertyDetailResolverService } from './property/property-detail/property-detail-resolver.service';


const appRoutes: Routes = [// Each route is JS object with 2 Properties. path defines the URL, component defines our component for the path.
  {path: '', component: PropertyListComponent},
  {path: 'add-property', component: AddPropertyComponent},
  {path: 'rent-property', component: PropertyListComponent},
  {path: 'property-detail/:id',
  component: PropertyDetailComponent,
  resolve: {prp: PropertyDetailResolverService}},
  {path: 'user/login', component: UserLoginComponent},
  {path: 'user/register', component: UserRegisterComponent},
  {path: '**', component: PropertyListComponent},

]

@NgModule({
  declarations: [
    AppComponent,
      PropertyCardComponent,
      PropertyListComponent,
      AddPropertyComponent,
      PropertyDetailComponent,
      NavBarComponent,
      UserRegisterComponent,
      UserLoginComponent,
      FilterPipe,
      SortPipe,
   ],
  imports: [
    BrowserModule,
    HttpClientModule, // configures the dependency injector for the http client
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ButtonsModule.forRoot(), // Adds directives and providers for in-app navigation among views defined in an application.
    BsDatepickerModule.forRoot(),
    NgxGalleryModule,
    NgxDropzoneModule,
  ],
  providers:[
    {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpErrorInterceptorService,
        multi: true
    },
    DatePipe,
    HousingService,
    AlertsService,
    AuthService,
    PropertyDetailResolverService,

],
  bootstrap: [AppComponent]
})
export class AppModule { }
