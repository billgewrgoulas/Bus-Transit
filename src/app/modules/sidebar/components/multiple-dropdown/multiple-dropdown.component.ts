import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ILine } from 'src/app/state/entities/line.entity';

@Component({
  selector: 'multiple-dropdown',
  templateUrl: './multiple-dropdown.component.html',
  styleUrls: ['./multiple-dropdown.component.css']
})
export class MultipleDropdownComponent implements OnInit{

  @Input() public title: string = '';
  @Input() public value: string = '';
  @Input() public data$!: Observable<ILine[]>;
  @Output() selectedValue = new EventEmitter<ILine>();

  constructor() { }

  ngOnInit(): void {}

  public select(line: ILine){
    this.selectedValue.emit(line);
  }

}
