import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from '../../../../state/actions/api-calls.actions';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/state/reducers/api-reducer';

@Component({
  selector: 'select-component',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {


  @Input() public placeholder: string = '';
  @Input() public module: string = '';

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {

   

  }

  public select(sdc_code: string){

    if(this.module === 'schedule'){
      // this.store.dispatch(actions.requests.getSchedule({sdc_code: sdc_code}));
      // this.store.dispatch(actions.requests.setCurrentSched({id: sdc_code}));
    }
    
  }

}
