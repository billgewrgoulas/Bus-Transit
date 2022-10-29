import { Component, OnInit, OnDestroy} from '@angular/core';
import { MapService } from 'src/app/services/map.service';
import { filter, Subscription, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState} from 'src/app/state/reducers/api-reducer';
import * as L from "leaflet";
import { getActiveStop, getRoutePathAndStops } from 'src/app/state/selectors/appState.selectors';
import { IMapData } from 'src/app/state/entities/map.data.entity';

@Component({
  selector: 'map-area',
  templateUrl: './map-area.component.html',
  styleUrls: ['./map-area.component.css']
})
export class MapAreaComponent implements OnInit, OnDestroy {

  private subscribers: Subscription[] = [];

  constructor(private store: Store<AppState>, private mapService: MapService) { }

  ngOnInit() {

    this.mapService.setMap = L.map('map');
    this.mapService.mapInit();

    this.subscribers.push(this.store.select(getRoutePathAndStops).pipe(
      tap(() => this.mapService.clearMap()),
      filter(data => !!data.points),
    ).subscribe(route => this.displayInfo(route!)));

    this.subscribers.push(this.store.select(getActiveStop).pipe(
      filter(stop => !!stop),
    ).subscribe(stop => this.flyTo([stop?.latitude!, stop?.longitude!])));

  }

  public displayInfo(route: IMapData){
    this.mapService.carvePath(route.points);
    this.mapService.displayMarkers(route.stops);
  }

  public flyTo(point: string[]){
    this.mapService.focusOnPoint(point);
  }

  ngOnDestroy(): void {
    this.subscribers.forEach(subscriber => subscriber.unsubscribe());
  }


}
