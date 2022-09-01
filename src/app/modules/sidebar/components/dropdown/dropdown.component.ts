import { Component, Input, OnInit } from '@angular/core';
import { Station } from 'src/app/models/station';
import { select, Store } from '@ngrx/store';
import { ILine} from 'src/app/state/entities/dataInterfaces';
import { Observable, pipe } from 'rxjs';
import * as actions from '../../../../state/actions/api-calls.actions';
import { filterDropdown, selectAllLines, AppState, currentRoute} from 'src/app/state/reducers/api-reducer';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'dropdown-component',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {

  @Input() public placeholder: string = '';
  @Input() public label: string = '';
  @Input() public module: string = '';
  
  public lines$!: Observable<ILine[]>;
  public value: string = '';
  public hideDropdown: boolean = true;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(actions.requests.getRoutes());
    this.lines$ = this.store.select(filterDropdown(this.value));
  }

  public delay(){
    setTimeout(()=>this.hideDropdown=true, 130);
  }

  public select(line: ILine){
    this.value = line.line_descr;
    this.store.dispatch(actions.requests.selectLine({code: line.line_code}));
    this.store.dispatch(actions.requests.getLineRoutes({code: line.line_code}));    
  }

  public filter(value: string){
    this.lines$ = this.store.select(filterDropdown(value));
  }
}
