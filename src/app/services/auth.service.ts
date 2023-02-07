import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private jwtHelper;
  
  constructor() {
    this.jwtHelper = new JwtHelperService();
  }

  public isAuthenticated(): boolean {
    const token: string = <string>localStorage.getItem('token');

    if (!token) {
      return false;
    }

    return !this.jwtHelper.isTokenExpired(token);
  }

  public getUserInfo() {
    let token = <string>localStorage.getItem('token');
    let dec: any = jwt_decode(token);
    return {name: dec.name, email: dec.email, user_id: dec.user_id};
  }

  public removeUserInfo() {
    localStorage.clear();
  }

}