import { Component, OnInit, OnDestroy} from '@angular/core';
import { MapService } from 'src/app/services/map.service';
import { filter, Subscription, switchMap, take, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState} from 'src/app/state/Reducers/api-reducer';
import * as L from "leaflet";
import { getActiveStop, getRoutePathAndStops } from 'src/app/state/Selectors/appState.selectors';
import { DataShareService } from 'src/app/services/data-share.service';


@Component({
  selector: 'map-area',
  templateUrl: './map-area.component.html',
  styleUrls: ['./map-area.component.css']
})
export class MapAreaComponent implements OnInit, OnDestroy {

  private subscribers: Subscription[] = [];

  constructor(
    private store: Store<AppState>, 
    private mapService: MapService, 
    private msg: DataShareService
  ) { }

  ngOnInit() {

    this.mapService.setMap = L.map('map');
    this.mapService.mapInit();

    this.subscribers = [

      this.store.select(getRoutePathAndStops).pipe(
        tap(() => this.mapService.clearMap()), filter(data => !!data)
      ).subscribe(data => this.mapService.displayRouteInformation(data!)), 

      this.msg.busObserver.pipe(
        filter(buses => buses.length > 0)
      ).subscribe(buses => this.mapService.displayBusLocations(buses)),

      this.store.select(getActiveStop).pipe(
        filter(stop => !!stop),
      ).subscribe(stop => this.mapService.focusOnPoint([stop!?.latitude, stop!?.longitude])),

      this.msg.pointObserver.pipe(
        filter(point => !!point && point.length > 0)
      ).subscribe(point => this.mapService.focusOnPoint(point)),

      this.msg.markerObserver.pipe(
        switchMap(obs => obs),
      ).subscribe(data => this.mapService.addMarker(data))
      
    ];

  }

  ngOnDestroy(): void {
    this.subscribers.forEach(subscriber => subscriber.unsubscribe());
  }

}
