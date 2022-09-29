import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IArrivalDetails } from 'src/app/state/entities/arival.entity';
import { IStation } from 'src/app/state/entities/station.entity';
import { AppState } from 'src/app/state/reducers/api-reducer';
import { currentStopSchedule, getActiveStation } from 'src/app/state/selectors/appState.selectors';

@Component({
  selector: 'station-entity',
  templateUrl: './station-entity.component.html',
  styleUrls: ['./station-entity.component.css'],
})
export class StationEntityComponent implements OnInit {

  public station$: Observable<IStation | undefined> | undefined;
  public arrival$!: Observable<IArrivalDetails | undefined>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.station$ = this.store.select(getActiveStation);
    this.arrival$ = this.store.select(currentStopSchedule);
  }

}
