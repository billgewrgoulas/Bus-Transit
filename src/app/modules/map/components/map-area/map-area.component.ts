import { Component, OnInit, OnDestroy} from '@angular/core';
import { MapService } from 'src/app/services/map.service';
import { filter, Subscription, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState} from 'src/app/state/reducers/api-reducer';
import { IRoute } from 'src/app/state/entities/dataInterfaces';
import * as L from "leaflet";

@Component({
  selector: 'map-area',
  templateUrl: './map-area.component.html',
  styleUrls: ['./map-area.component.css']
})
export class MapAreaComponent implements OnInit, OnDestroy {

  private currentLine$!: Subscription;

  constructor(private store: Store<AppState>, private mapService: MapService) { }

  ngOnInit() {

    this.mapService.setMap = L.map('map');
    this.mapService.mapInit();

    // this.currentLine$ = this.store.select(routeDetails).pipe(
    //   tap(() => this.mapService.clearMap()),
    //   filter(details => details != undefined)
    // ).subscribe(route => this.displayInfo(route!));

  }

  public displayInfo(route: IRoute){
    this.mapService.carvePath(route.latLong);
    this.mapService.displayMarkers(route.stations);
  }

  ngOnDestroy(): void {
    this.currentLine$.unsubscribe();
  }


}
