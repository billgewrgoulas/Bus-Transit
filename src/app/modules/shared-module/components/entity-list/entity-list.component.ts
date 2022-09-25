import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.css']
})
export class EntityListComponent implements OnInit {

  @Input() public module: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
