import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'slider-component',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent implements OnInit {

  public selectedTab: number = 0;
  
  constructor() { }

  ngOnInit(): void {}

  public slide(tab: number){
    this.selectedTab = tab;
  }


}
