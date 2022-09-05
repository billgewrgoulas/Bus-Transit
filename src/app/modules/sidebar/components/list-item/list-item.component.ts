import { Component, Input, OnInit } from '@angular/core';
import { IStation } from 'src/app/state/entities/dataInterfaces';

@Component({
  selector: 'list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  @Input() public station!: IStation;
  @Input() public isLast: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
