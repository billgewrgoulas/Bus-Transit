import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'multiple-dropdown',
  templateUrl: './multiple-dropdown.component.html',
  styleUrls: ['./multiple-dropdown.component.css'],
})
export class MultipleDropdownComponent implements OnInit{

  @Input() public title: string = '';
  @Input() public value: string = '';
  @Input() public data: any[] = [];
  @Output() public selectedValue = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {}

  public select(data: any){
    this.selectedValue.emit(data);
  }

}
