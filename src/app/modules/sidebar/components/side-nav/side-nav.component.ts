import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideAnimation } from 'src/app/route-animations';


@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
  animations: [slideAnimation]
})
export class SideNavComponent implements OnInit {

  public module: string = 'routes';

  constructor() { }

  ngOnInit(): void {

  }

  public prepareOutlet(outlet: RouterOutlet){
    return outlet && outlet.activatedRouteData;
  }
}
