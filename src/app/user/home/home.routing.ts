import { Routes } from '@angular/router';
import { NoAuthGuard, UsersettingComponent,HomeComponent,UsernotificationComponent,DashboardComponent,DatafileComponent,ForecastComponent } from '../home';

export const HomeRoutes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'usersetting', component: UsersettingComponent },
    { path: 'forecast', component: ForecastComponent },
    { path: 'usernotification', component: UsernotificationComponent },
    { path: 'dashboard', component: DashboardComponent },    
    { path: 'dashboard/:id', component: DashboardComponent },    
    { path: 'datafile/:id', component: DatafileComponent }
];
