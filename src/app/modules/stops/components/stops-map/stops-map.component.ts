import { Component, OnInit } from '@angular/core';
import { StopsStore } from '../../state/stop.store';
import { AppState } from 'src/app/state/Reducers/api-reducer';
import { Store } from '@ngrx/store';
import { Observable, Subject, tap } from 'rxjs';
import { getActiveStop } from 'src/app/state/Selectors/appState.selectors';
import { IArrival } from 'src/app/state/Entities/live.data';
import { DataShareService } from 'src/app/services/data-share.service';
import { IScheduleDetails } from 'src/app/state/Entities/schedule.entity';
import { IStop } from 'src/app/state/Entities/stop.entity';

@Component({
  selector: 'stops-map',
  templateUrl: './stops-map.component.html',
  styleUrls: ['./stops-map.component.css'],
  providers: [StopsStore]
})
export class StopsMapComponent implements OnInit {

  public value: string = 'Map';
  public departures$!: Observable<IArrival[]>;

  constructor(
    private store: Store<AppState>,
    private localStore: StopsStore,
    private msg: DataShareService
  ) { }

  ngOnInit(): void {

    this.localStore.fetchArrivals(
      this.store.select(getActiveStop).pipe(tap(stop => this.init(stop)))
    );

    this.departures$ = this.localStore.getArrivalState().pipe(
      tap(buses => this.msg.sendBusStatus(buses))
    );
    
  }

  private init(stop: IStop | undefined){
    if(stop){
      this.value = stop.desc;
    }else{
      this.value = 'Στάσεις'
    }
  }

}
