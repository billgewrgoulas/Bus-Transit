import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map } from 'rxjs';
import { IRoute } from 'src/app/state/Entities/route.entity';
import { LiveDataStore } from 'src/app/modules/lines/state/live.data.store';
import { AppState } from 'src/app/state/Reducers/api-reducer';
import { currentLine, currentRoute, getActiveStop, isRouteSaved } from 'src/app/state/Selectors/appState.selectors';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import * as api_actions from 'src/app/state/Actions/api-calls.actions';
import * as select_action from 'src/app/state/Actions/select.actions';

interface CurrentRoute{
  route: IRoute | undefined,
  saved: boolean
}

@Component({
  selector: 'route-details',
  templateUrl: './route-details.component.html',
  styleUrls: ['./route-details.component.css'],
  providers: [LiveDataStore]
})
export class RouteDetailsComponent implements OnInit, OnDestroy {

  public vm$!: Observable<CurrentRoute>;

  constructor(
    private store: Store<AppState>, 
    private localStore: LiveDataStore,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    
    this.vm$ = combineLatest([
      this.store.select(isRouteSaved),
      this.store.select(currentRoute)
    ]).pipe(map(([saved, route]) => ({saved, route})));

    this.localStore.fetchBusLocations(this.store.select(currentLine));
    this.localStore.fetchArrivals(this.store.select(getActiveStop));

  }

  ngOnDestroy(): void {
    this.store.dispatch(select_action.emptyPath());
  }

  public onSave(code: string){
    this.store.dispatch(api_actions.saveRoute({code: code}));
  }

  public onRemove(code: string){
    this.store.dispatch(api_actions.deleteRoute({code: code}));
  }

  public get authenticated(){
    return this.auth.isAuthenticated();
  }

}
