import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import * as api_actions from '../../../../state/actions/api-calls.actions';
import { AppState } from 'src/app/state/reducers/api-reducer';
import { IRoute } from 'src/app/state/entities/route.entity';
import { of } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { DataShareService } from 'src/app/services/data-share.service';

@Component({
  selector: 'select-component',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

  public daysEng: string[] = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 
    'Thursday', 'Friday', 'Saturday'
  ];

  @Input() public placeholder: string = '';
  @Input() public module: string = '';
  @Input() public payload!: IRoute;

  constructor(private store: Store<AppState>, private dataShare: DataShareService) { }

  ngOnInit(): void {}

  public select(day: number){
    this.store.dispatch(api_actions.getSchedules({code: this.payload.code}));
    this.dataShare.onDaySelect(day);
  }

}
