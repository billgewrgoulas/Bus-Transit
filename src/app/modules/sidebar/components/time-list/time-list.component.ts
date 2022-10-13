import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'time-list-component',
  templateUrl: './time-list.component.html',
  styleUrls: ['./time-list.component.css']
})
export class TimeListComponent implements OnInit {

  @Input() public header: string = '';
  @Input() public data: string[] = [];

  constructor() { }

  ngOnInit(): void {
    
  }

}
