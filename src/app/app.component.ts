import { Component, HostListener, OnInit } from '@angular/core';
import { SocketIOService } from './services/socket-io.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as nav from 'src/app/state/Actions/navigation.actions';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public title = 'CityBus';
  public flag: boolean = true;

  constructor(private io: SocketIOService, private router: Router, private store: Store){}

  ngOnInit(){
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  public onResize(){

    if(window.innerWidth > 500){
      this.flag = true;
    }else{
      this.flag = false;
    }

    if(!this.flag && this.router.url.includes("map")){
      this.store.dispatch(nav.arrowNavigation());
    }

  }
  
}
