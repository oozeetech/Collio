import { Routes } from '@angular/router';
import { NoAuthGuard, UsersettingComponent,HomeComponent,UsernotificationComponent,DashboardComponent } from '../home';

export const HomeRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'usersetting', component: UsersettingComponent },
    { path: 'usernotification', component: UsernotificationComponent },
    { path: 'dashboard', component: DashboardComponent }
];
