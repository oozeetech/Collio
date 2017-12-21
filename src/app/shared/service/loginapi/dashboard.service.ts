import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs/Subject'
import { DashBoardInfo } from '../../model';
import { ApiService } from '../api.service';// It's for get set token
import { JwtService } from '../jwt.service'; //dirstory token method


@Injectable()

export class DashboardService {

    //constructor for create object for class then create all object for service like...
    constructor(private apiService: ApiService, private http: Http, private jwtService: JwtService) { }

    //Get DashBoard Information Code here.......
    GetTabInformation(route): Observable<any> {
        return this.apiService.getWithUrl(route)
            .map(data => data);
    }

}

