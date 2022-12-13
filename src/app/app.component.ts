import { Component, OnInit } from '@angular/core';
import { SocketIOService } from './services/socket-io.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CityBus';

  constructor(){}

  ngOnInit(){
    // this.io.setupSocketConnection();
  }

  


}
