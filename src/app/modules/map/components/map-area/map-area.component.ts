import { Component, OnInit, OnDestroy} from '@angular/core';
import { MapService } from 'src/app/services/map.service';
import { filter, Subscription, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState} from 'src/app/state/reducers/api-reducer';
import * as L from "leaflet";
import { getActiveStop, getEnd, getRoutePathAndStops, getStart } from 'src/app/state/selectors/appState.selectors';
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
              private dataShare: DataShareService) { }

  ngOnInit() {

    this.mapService.setMap = L.map('map');
    this.mapService.mapInit();

    this.subscribers.push(this.store.select(getRoutePathAndStops).subscribe(route => this.mapService.displayRouteInformation(route)));
    this.subscribers.push(this.dataShare.busObserver.subscribe(buses => this.mapService.displayBusLocations(buses)));

    this.subscribers.push(this.store.select(getStart).subscribe(data => this.mapService.addStart(data)));
    this.subscribers.push(this.store.select(getEnd).subscribe(data => this.mapService.addEnd(data)));

    this.subscribers.push(this.store.select(getActiveStop).pipe(
      filter(stop => !!stop),
    ).subscribe(stop => this.flyTo([stop?.latitude!, stop?.longitude!])));

    this.subscribers.push(this.dataShare.pointObserver.pipe(
      filter(point => !!point && point.length > 0)
    ).subscribe(point => this.flyTo(point)));

  }

  public flyTo(point: string[]){
    this.mapService.focusOnPoint(point);
  }

  ngOnDestroy(): void {
    this.subscribers.forEach(subscriber => subscriber.unsubscribe());
  }

}
