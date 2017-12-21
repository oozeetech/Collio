import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class JwtService {
  constructor(
    private router: Router
  ) { }
  private getCookie(name) {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length == 2)
      return parts.pop().split(";").shift();
  }
  getToken(): String {
    
    return localStorage.getItem('jwtToken');
  }
  getCsrt(): String {
    return localStorage.getItem('csrftoken');
  }

  saveToken(token: String) {
    localStorage.setItem('csrftoken', this.getCookie('csrftoken'));
    localStorage.setItem('jwtToken', token.toString());
  }

  destroyToken() {
    localStorage.removeItem('csrftoken');
    localStorage.removeItem('jwtToken');
  }

  getError(): String {
    return localStorage.getItem('jwtToken');
  }

  saveError(Error: String) {
    localStorage.setItem('jwtError', Error.toString());
  }

  destroyError() {
    localStorage.removeItem('jwtError');
  }

}
