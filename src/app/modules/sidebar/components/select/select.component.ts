import { Component, Input, OnInit } from '@angular/core';
import { IMlInfo } from 'src/app/state/entities/mLine.entity';

@Component({
  selector: 'select-component',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

  @Input() public data: IMlInfo[] = [];
  @Input() public placeholder: string = 'Select a schedule';

  constructor() { }

  ngOnInit(): void {}

  public select(i: number){
    
  }

}
