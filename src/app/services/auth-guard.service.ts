import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  
  constructor(private auth: AuthService, private router: Router) {}

  //ensure if a route can be activated
  public canActivate() {

    if (this.auth.isAuthenticated()) {
      return true;
    }

    this.router.navigate([{ outlets: { sidebar: ['auth', 'login'] }}]);
    return false;
  }
}