import { Component, OnInit, OnDestroy} from '@angular/core';
import { MapService } from 'src/app/services/map.service';
import { filter, Subscription, switchMap, take } from 'rxjs';
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

  constructor(private store: Store<AppState>, 
              private mapService: MapService, 
              private msg: DataShareService) { }

  ngOnInit() {

    this.mapService.setMap = L.map('map');
    this.mapService.mapInit();

    this.subscribers.push(this.store.select(getRoutePathAndStops)
      .subscribe(data => this.mapService.displayRouteInformation(data)));

    this.subscribers.push(
      this.msg.busObserver.subscribe(buses => this.mapService.displayBusLocations(buses)
    ));

    this.subscribers.push(this.store.select(getActiveStop).pipe(
      filter(stop => !!stop),
    ).subscribe(stop => this.flyTo([stop?.latitude!, stop?.longitude!])));

    this.subscribers.push(this.msg.pointObserver.pipe(
      filter(point => !!point && point.length > 0)
    ).subscribe(point => this.flyTo(point)));

    this.subscribers.push(this.msg.markerObserver.pipe(
      switchMap(obs => obs.pipe(v => v))
    ).subscribe(data => this.mapService.addMarker(data)));

  }

  public flyTo(point: string[]){
    this.mapService.focusOnPoint(point);
  }

  ngOnDestroy(): void {
    this.subscribers.forEach(subscriber => subscriber.unsubscribe());
  }

}
