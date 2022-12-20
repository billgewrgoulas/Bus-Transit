import { Component, OnChanges, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { DataShareService } from 'src/app/services/data-share.service';
import { ILine } from 'src/app/state/Entities/line.entity';
import { IArrival } from 'src/app/state/Entities/live.data';
import { IRoute } from 'src/app/state/Entities/route.entity';
import { IStop } from 'src/app/state/Entities/stop.entity';
import { StopsStore } from 'src/app/modules/stops/state/stop.store';
import { AppState } from 'src/app/state/Reducers/api-reducer';
import { getActiveStop, getRouteList, getStopLines } from 'src/app/state/Selectors/appState.selectors';

@Component({
  selector: 'stop-slider',
  templateUrl: './stop-slider.component.html',
  styleUrls: ['./stop-slider.component.css'],
  providers: [StopsStore]
})
export class StopSliderComponent implements OnInit {

  public selectedTab: number = 0;
  public routes$!: Observable<IRoute[]>;
  public departures$!: Observable<IArrival[]>;
  public value: string = '';
  public latLng: string[] = [];

  constructor(
    private store: Store<AppState>, 
    private local: StopsStore, 
    private msg: DataShareService
  ) { }

  ngOnInit(): void {
    this.routes$ = this.store.select(getRouteList);
    this.local.fetchArrivals(this.store.select(getActiveStop).pipe(tap(stop => this.initStop(stop))));
    this.departures$ = this.local.getArrivalState().pipe(
      tap(buses => this.msg.sendBusStatus(buses))
    );
  }

  public recenter(){
    this.msg.fly(this.latLng);
  }

  private initStop(stop: IStop | undefined){

    if(stop){
      this.value = stop.desc;
      this.latLng = [stop.latitude, stop.longitude];
    }

  }

}
