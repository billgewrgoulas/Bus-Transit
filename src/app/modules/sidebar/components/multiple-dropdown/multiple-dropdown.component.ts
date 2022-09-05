import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ILine } from 'src/app/state/entities/dataInterfaces';
import { AppState } from 'src/app/state/reducers/api-reducer';
import { filterDropdown } from 'src/app/state/selectors/appState.selectors';
import * as actions from '../../../../state/actions/api-calls.actions';

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

  constructor(private router: Router, private store: Store<AppState>) { }

  ngOnInit(): void {}

  public select(line: ILine){
    this.selectedValue.emit(line);
  }

}
