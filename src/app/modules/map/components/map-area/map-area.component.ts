import { Component, OnInit, OnDestroy} from '@angular/core';
import { filter, Subscription, switchMap, take, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState} from 'src/app/state/Reducers/api-reducer';
import * as L from "leaflet";
import { getActiveStop, getRoutePathAndStops, selectItinerary } from 'src/app/state/Selectors/appState.selectors';
import { DataShareService } from 'src/app/services/data-share.service';
import { LinesMap } from '../../mapControllers/linesMapControllers';
import { TripPlannerMap } from '../../mapControllers/tripPlannerMapControllers';


@Component({
  selector: 'map-area',
  templateUrl: './map-area.component.html',
  styleUrls: ['./map-area.component.css']
})
export class MapAreaComponent implements OnInit, OnDestroy {

  private subscribers: Subscription[] = [];
  private linesMap!: LinesMap;
  private tripMap!: TripPlannerMap;

  constructor(
    private store: Store<AppState>, 
    private msg: DataShareService
  ) { }

  ngOnInit() {

    const map = L.map('map');
    this.initMap(map);

    this.linesMap = new LinesMap(map);
    this.tripMap = new TripPlannerMap(map, this.msg);
    
    this.subscribers = [

      this.store.select(getRoutePathAndStops).subscribe(data => this.linesMap.displayRouteInfo(data)), 

      this.msg.busObserver.pipe(
        filter(buses => buses.length > 0)
      ).subscribe(buses => this.linesMap.displayBusLocations(buses)),

      this.store.select(getActiveStop).pipe(
        filter(stop => !!stop),
      ).subscribe(stop => this.linesMap.focusOnPoint([stop!?.latitude, stop!?.longitude])),

      this.msg.pointObserver.pipe(
        filter(point => !!point && point.length > 0)
      ).subscribe(point => this.linesMap.focusOnPoint(point)),

      this.msg.markerObserver.pipe(
        switchMap(obs => obs),
        filter(v => !v.fetch)
      ).subscribe(data => this.tripMap.addMarker(data)),

      this.store.select(selectItinerary).subscribe(it => this.tripMap.displayItinerary(it)),
      this.msg.clearMapObserver.subscribe(v => this.clearMap()),
      this.msg.removeDragObserver.subscribe(v => this.tripMap.dragOff())
      
    ];

  }

  ngOnDestroy(): void {
    this.subscribers.forEach(subscriber => subscriber.unsubscribe());
  }

  private clearMap(){
    this.linesMap.displayRouteInfo(undefined);
    this.tripMap.clearPoints();
    this.tripMap.clearLayerGroup();
  }

  private initMap(map: L.Map){
    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(map);
    map.setView([39.667341104708946, 20.854922400637918], 13);
  }

}
