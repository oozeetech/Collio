import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LandingRoutes } from './landing.routing';
import { LandingComponent } from '../landing';
import { UserService } from '../../shared/service/loginapi/user.service'
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LandingRoutes),
    FormsModule
  ],
  declarations: [LandingComponent],
  providers: [UserService]
})
export class LandingModule { }
