import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, combineLatest, map, tap } from 'rxjs';
import { DataShareService } from 'src/app/services/data-share.service';
import { ILine } from 'src/app/state/Entities/line.entity';
import { IArrival } from 'src/app/state/Entities/live.data';
import { IRoute } from 'src/app/state/Entities/route.entity';
import { IStop } from 'src/app/state/Entities/stop.entity';
import { StopsStore } from 'src/app/modules/stops/state/stop.store';
import { AppState } from 'src/app/state/Reducers/api-reducer';
import { getActiveStop, getRouteList, getStopLines, isStopSaved, spinner } from 'src/app/state/Selectors/appState.selectors';
import { AuthService } from 'src/app/services/auth.service';
import * as api_actions from 'src/app/state/Actions/api-calls.actions';
import { Router } from '@angular/router';

interface StopInfo{
  stop: IStop | undefined;
  routes: IRoute[];
  saved: boolean;
  spinner: boolean;
}

@Component({
  selector: 'stop-slider',
  templateUrl: './stop-slider.component.html',
  styleUrls: ['./stop-slider.component.css'],
  providers: [StopsStore]
})
export class StopSliderComponent implements OnInit {

  public selectedTab: number = 0;
  public departures$!: Observable<IArrival[]>;
  public vm$!: Observable<StopInfo>;

  constructor(
    private store: Store<AppState>, 
    private local: StopsStore, 
    private msg: DataShareService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.vm$ = combineLatest([
      this.store.select(isStopSaved),
      this.store.select(getActiveStop),
      this.store.select(getRouteList),
      this.store.select(spinner)
    ]).pipe(map(([saved, stop, routes, spinner]) => ({saved, stop, routes, spinner})));

    this.departures$ = this.local.getArrivalState().pipe(
      tap(buses => this.msg.sendBusStatus(buses))
    );

    this.local.fetchArrivals(this.vm$.pipe(map(data => data.stop)));

  }

  public onSave(code: string){
    this.store.dispatch(api_actions.saveStop({code: code}));
  }

  public onRemove(code: string){
    this.store.dispatch(api_actions.deleteStop({code: code}));
  }

  public onNavigate(route: string[]){
    this.router.navigate([{ outlets: { sidebar: route }}], {queryParams: {module: 'route_data'}});
  }

  public get apiMsg(): Subject<string>{
    return this.msg.apiMsg;
  }

  public get authenticated(){
    return this.auth.isAuthenticated();
  }

}
