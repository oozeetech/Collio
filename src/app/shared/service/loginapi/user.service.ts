import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs/Subject'
import { CommonModel } from '../index';
import { ApiService } from '../api.service';// It's for get set token
import { JwtService } from '../jwt.service'; //dirstory token method


@Injectable()

export class UserService {
  private currentUserSubject = new BehaviorSubject<CommonModel>(new CommonModel());
  public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();
  public isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();


  //constructor for create object for class then create all object for service like...
  constructor(private apiService: ApiService, private http: Http, private jwtService: JwtService) {
  }


  //set authentication return value for web service 
  setAuthentication(_CommonModel: CommonModel) {

    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(_CommonModel['key']);

  }

  //attempt authentication
  attemptAuth(route: string, credentials): Observable<CommonModel> {

    return this.apiService.post(route, credentials)
      .map(
      data => {

        this.setAuthentication(data);
        return data;
      }
      );
  }

  //delete all localstorage
  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();

    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }
  logOut(route: string): Observable<any> {
    return this.apiService.post(route)
      .map(data => { this.purgeAuth(); return data; });
  }
  //Comunication Two Component
  public _RoutingActive = new Subject<string>();
  public Routingevent = this._RoutingActive.asObservable();
  public CurrentRoutingPage(_RoutingPageName: string) {
    this._RoutingActive.next(_RoutingPageName);
  }
  //Comunication Two Component
  public _PageActive = new Subject<string>();
  public Pageevent = this._PageActive.asObservable();
  public CurrentPage(_PageName: string) {
    this._PageActive.next(_PageName);
  }
}
