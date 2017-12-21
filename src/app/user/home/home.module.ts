import { RouterModule } from '@angular/router';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeRoutes } from './home.routing';
import { HomeComponent, NoAuthGuard, UsersettingComponent } from '../home';
import { UsernotificationComponent, DashboardComponent, DatafileComponent } from './';
import { PipeModule } from '../../shared/pipe/pipe.module'
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(HomeRoutes),
    FormsModule, PipeModule
  ],
  declarations: [HomeComponent, UsersettingComponent, UsernotificationComponent, DashboardComponent, DatafileComponent],
  providers: [NoAuthGuard],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule { }
