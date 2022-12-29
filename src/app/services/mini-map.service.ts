import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MiniMapService implements CanActivate {

  constructor() { }
  
  public canActivate(): boolean{

    if(window.innerWidth <= 500){
      return true;
    }

    return false;
  }
}
