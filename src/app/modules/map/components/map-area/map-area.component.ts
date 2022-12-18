import { Component, OnInit, OnDestroy} from '@angular/core';
import { filter, Subscription, switchMap, take, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState} from 'src/app/state/Reducers/api-reducer';
import * as L from "leaflet";
import { getActiveStop, getAllStops, getRoutePathAndStops, getStopsModule, selectItinerary } from 'src/app/state/Selectors/appState.selectors';
import { DataShareService } from 'src/app/services/data-share.service';
import { LinesMap } from '../../mapControllers/linesMapControllers';
import { TripPlannerMap } from '../../mapControllers/tripPlannerMapControllers';
import { StopsMap } from '../../mapControllers/stopMapController';
import { Router } from '@angular/router';


@Component({
  selector: 'map-area',
  templateUrl: './map-area.component.html',
  styleUrls: ['./map-area.component.css']
})
export class MapAreaComponent implements OnInit, OnDestroy {

  private subscribers: Subscription[] = [];
  private linesMap!: LinesMap;
  private tripMap!: TripPlannerMap;
  private stopsMap!: StopsMap;

  constructor(
    private store: Store<AppState>, 
    private msg: DataShareService,
    private router: Router
  ) { }

  ngOnInit() {

    const map = L.map('map');
    this.initMap(map);

    this.linesMap = new LinesMap(map);
    this.tripMap = new TripPlannerMap(map, this.msg);
    this.stopsMap = new StopsMap(map, this.router);
    
    this.subscribers = [

      this.store.select(getRoutePathAndStops).subscribe(data => this.linesMap.displayRouteInfo(data)), 

      this.msg.busObserver.pipe(
        filter(buses => buses.length > 0)
      ).subscribe(buses => this.linesMap.displayBusLocations(buses)),

      this.store.select(getActiveStop).pipe(
        tap(stop => this.stopsMap.setCurrentStop(stop)), filter(stop => !!stop),
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
      this.msg.removeDragObserver.subscribe(v => this.tripMap.dragOff()),
      this.store.select(getStopsModule).subscribe(stops => this.stopsMap.addClustersToMap(stops))
      
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
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    map.setView([39.667341104708946, 20.854922400637918], 13);
  }

}
