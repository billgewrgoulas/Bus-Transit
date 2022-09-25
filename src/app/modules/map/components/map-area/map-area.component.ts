import { Component, OnInit, OnDestroy} from '@angular/core';
import { MapService } from 'src/app/services/map.service';
import { filter, Subscription, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState} from 'src/app/state/reducers/api-reducer';
import * as L from "leaflet";
import { currentRoute, getRouteVeh, getRoutePathAndStops, getActiveStation } from 'src/app/state/selectors/appState.selectors';
import { IMapData } from 'src/app/state/entities/map.data.entity';
import { IBus } from 'src/app/state/entities/bus.entity';
import { IStation } from 'src/app/state/entities/station.entity';

@Component({
  selector: 'map-area',
  templateUrl: './map-area.component.html',
  styleUrls: ['./map-area.component.css']
})
export class MapAreaComponent implements OnInit, OnDestroy {

  private currentRoute$!: Subscription;
  private buses$!: Subscription;
  private station$!: Subscription;

  constructor(private store: Store<AppState>, private mapService: MapService) { }

  ngOnInit() {

    this.mapService.setMap = L.map('map');
    this.mapService.mapInit();

    this.currentRoute$ = this.store.select(getRoutePathAndStops).pipe(
      tap(() => this.mapService.clearMap()),
      filter(data => !!data.path),
    ).subscribe(route => this.displayInfo(route!));

    this.buses$ = this.store.select(getRouteVeh).pipe(
      filter(buses => !!buses)
    ).subscribe(buses => this.updateBusLoacations(buses));

    this.station$ = this.store.select(getActiveStation).pipe(
      filter(stop => !!stop),
    ).subscribe(stop => this.flyTo(stop));

  }

  public displayInfo(route: IMapData){
    this.mapService.carvePath(route.path);
    this.mapService.displayMarkers(route.stations);
  }

  public updateBusLoacations(buses?: IBus[]){
    this.mapService.displayBusLocations(buses!);
  }

  public flyTo(stop?: IStation){
    this.mapService.focusOnStop(stop!);
  }

  ngOnDestroy(): void {
    this.currentRoute$.unsubscribe();
    this.buses$.unsubscribe();
    this.station$.unsubscribe();
  }


}
