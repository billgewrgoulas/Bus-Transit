import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ILine } from 'src/app/state/entities/line.entity';
import { AppState } from 'src/app/state/reducers/api-reducer';
import { filterDropdown, selectAllLines } from 'src/app/state/selectors/appState.selectors';

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

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {}

  public select(line: ILine){
    console.log(line);
    this.selectedValue.emit(line);
  }

}
