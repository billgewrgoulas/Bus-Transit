import { Component, OnInit } from '@angular/core';
import { Station } from 'src/app/models/station';

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  public module: string = 'routes';

  constructor() { }

  ngOnInit(): void {

  }
}
