import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeRoutes } from './home.routing';
import { HomeComponent, NoAuthGuard,UsersettingComponent } from '../home';
import { UsernotificationComponent } from './usernotification/usernotification.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(HomeRoutes),
    FormsModule,
  ],
  declarations: [HomeComponent,UsersettingComponent, UsernotificationComponent, DashboardComponent],
  providers: [NoAuthGuard]
})
export class HomeModule { }
