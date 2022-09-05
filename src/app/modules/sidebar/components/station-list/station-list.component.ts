import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IStation } from 'src/app/state/entities/dataInterfaces';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/state/reducers/api-reducer';
import { routeStations } from 'src/app/state/selectors/appState.selectors';
import * as actions from '../../../../state/actions/api-calls.actions';


@Component({
  selector: 'station-list-component',
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.css']
})
export class StationListComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  public currentRouteStations$!: Observable<IStation[] | undefined>;

  ngOnInit(): void {
    this.currentRouteStations$ = this.store.select(routeStations);
  }

  public fetchStationInfo(station: IStation){
    this.store.dispatch(actions.requests.getStationsArrivals({stopCode: station.stationCode}));
  }

  
}
