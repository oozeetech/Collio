import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';///User For form page must be added.....
import { HttpModule, XSRFStrategy, CookieXSRFStrategy } from '@angular/http';///User For Service must be added.....
import { Routes, RouterModule } from '@angular/router'; //routing for page
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { UserloginComponent } from './layout';
import { UserService, RegistersService,UserNotificationService } from './shared/service/loginapi/index'
import { ApiService, JwtService } from './shared';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserafterloginComponent } from './layout/userafterlogin/userafterlogin.component';
import { NoAuthGuard } from '../app/user/home'
import { CommonModule } from '@angular/common'
import { CookieService } from 'angular2-cookie/core';
import { Angular2SocialLoginModule } from "angular2-social-login";

let providers = {
  // "google": {
  //   "clientId": "GOOGLE_CLIENT_ID"
  // },
  // "linkedin": {
  //   "clientId": "LINKEDIN_CLIENT_ID"
  // },
  "facebook": {
    "clientId": "290907454582778",
    "apiVersion": "v2.10" //like v2.4 
  }
};
@NgModule({
  declarations: [
    AppComponent,
    UserloginComponent,
    UserafterloginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule, CommonModule,
    RouterModule.forRoot(AppRoutes),
    Angular2SocialLoginModule
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }, {
    provide: XSRFStrategy,
    useValue: new CookieXSRFStrategy('csrftoken', 'X-CSRFToken')
  }, ApiService, JwtService, UserService, RegistersService, NoAuthGuard, CookieService,UserNotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
Angular2SocialLoginModule.loadProvidersScripts(providers);



