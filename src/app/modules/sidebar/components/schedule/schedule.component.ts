import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from 'src/app/state/reducers/api-reducer';

@Component({
  selector: 'schedule-component',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {



  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {

  }

}
