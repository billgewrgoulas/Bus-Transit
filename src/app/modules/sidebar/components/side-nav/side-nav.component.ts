import { Component, OnInit } from '@angular/core';
import { Station } from 'src/app/models/station';

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  public active: boolean[] = [true, false, false];
  public module: string = 'routes';

  constructor() { }

  ngOnInit(): void {

  }

  public change(index: number, module: string){
    for(let i = 0; i < this.active.length; i++){
      this.active[i] = false;
    }
    this.active[index] = true;
    this.module = module;
  }
}
