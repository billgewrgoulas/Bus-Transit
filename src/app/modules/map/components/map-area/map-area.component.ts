import { Component, OnInit, OnDestroy} from '@angular/core';
import { MapService } from 'src/app/services/map.service';
import { filter, Subscription, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState} from 'src/app/state/reducers/api-reducer';
import * as L from "leaflet";
import { getActiveStop, getRoutePathAndStops } from 'src/app/state/selectors/appState.selectors';
import { IMapData } from 'src/app/state/entities/map.data.entity';
import { DataShareService } from 'src/app/services/data-share.service';
import { IArrival } from 'src/app/state/entities/live.data';
import { getEnd, getStart, MapState } from 'src/app/state/reducers/map.reducer';

@Component({
  selector: 'map-area',
  templateUrl: './map-area.component.html',
  styleUrls: ['./map-area.component.css']
})
export class MapAreaComponent implements OnInit, OnDestroy {

  private subscribers: Subscription[] = [];

  constructor(private store: Store<AppState>, 
              private mapService: MapService, 
              private dataShare: DataShareService,
              private mapStore: Store<MapState>) { }

  ngOnInit() {

    this.mapService.setMap = L.map('map');
    this.mapService.mapInit();

    this.subscribers.push(this.store.select(getRoutePathAndStops).pipe(
      filter(data => !!data.points),
      tap(() => this.mapService.clearMap()),
    ).subscribe(route => this.displayInfo(route!)));

    this.subscribers.push(this.store.select(getActiveStop).pipe(
      filter(stop => !!stop),
    ).subscribe(stop => this.flyTo([stop?.latitude!, stop?.longitude!])));

    this.subscribers.push(this.dataShare.busObserver.pipe(
      filter(buses => buses.length > 0)
    ).subscribe(buses => this.displayBusLocations(buses)));

    this.subscribers.push(this.dataShare.pointObserver.pipe(
      filter(point => !!point && point.length > 0)
    ).subscribe(point => this.flyTo(point)));

    this.subscribers.push(this.mapStore.select(getStart).pipe(
      filter(data => !!data && data.length > 0)
    ).subscribe(data => this.mapService.addStart(data)));

    this.subscribers.push(this.mapStore.select(getEnd).pipe(
      filter(data => !!data && data.length > 0)
    ).subscribe(data => this.mapService.addEnd(data)));

  }

  public displayInfo(route: IMapData){
    this.mapService.carvePath(route.points);
    this.mapService.displayMarkers(route.stops);
  }

  public displayBusLocations(buses: IArrival[]){
    this.mapService.displayBusLocations(buses);
  }

  public flyTo(point: string[]){
    this.mapService.focusOnPoint(point);
  }

  ngOnDestroy(): void {
    this.subscribers.forEach(subscriber => subscriber.unsubscribe());
  }


}
