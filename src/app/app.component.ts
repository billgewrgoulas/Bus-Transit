import { Component, HostListener, OnInit } from '@angular/core';
import { SocketIOService } from './services/socket-io.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public title = 'CityBus';
  public flag: boolean = true;

  constructor(private io: SocketIOService){}

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

  }
  
}
