import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { DataShareService } from 'src/app/services/data-share.service';
import { ISchedule } from 'src/app/state/entities/schedule.entity';
import { IStop } from 'src/app/state/entities/stop.entity';
import { AppState } from 'src/app/state/reducers/api-reducer';
import { getDailySchedule } from 'src/app/state/selectors/appState.selectors';
import * as select_actions from '../../../../state/actions/select.actions';

@Component({
  selector: 'list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit, OnDestroy {

  @Input() public stop!: IStop;
  @Input() public isLast: boolean = false;

  public schedules$!: Observable<ISchedule[]>;
  private onSelect!: Subscription;

  constructor(private store: Store<AppState>, private dataShare: DataShareService) { }

  ngOnInit(): void {
    this.onSelect = this.dataShare.dayObserver.subscribe(day => this.onDaySelect(day));
  }

  ngOnDestroy(): void {
    this.onSelect.unsubscribe();
  }

  public onDaySelect(day: number){
    this.schedules$ = this.store.select(getDailySchedule(day, this.stop.code));
  }

  public selectStop(){
    this.store.dispatch(select_actions.selectStop({code: this.stop.code}));
    this.dataShare.slide(2);
  }

}
