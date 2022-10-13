import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IMlInfo } from 'src/app/state/entities/mLine.entity';
import { ISchedule } from 'src/app/state/entities/schedule.entity';
import { AppState } from 'src/app/state/reducers/api-reducer';
import { currentSchedule, scheduleDays } from 'src/app/state/selectors/appState.selectors';

@Component({
  selector: 'schedule-component',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  public schedule$!: Observable<ISchedule | undefined>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.schedule$ = this.store.select(currentSchedule);
  }

}
