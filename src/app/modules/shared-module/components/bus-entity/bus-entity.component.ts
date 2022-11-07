import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, takeLast } from 'rxjs';
import { DataShareService } from 'src/app/services/data-share.service';
import { LiveDataStore } from 'src/app/state/componentStore/live.data.store';
import { ILine } from 'src/app/state/entities/line.entity';
import { IArrival } from 'src/app/state/entities/live.data';
import { AppState } from 'src/app/state/reducers/api-reducer';
import { currentLine } from 'src/app/state/selectors/appState.selectors';
import * as navigation from'../../../../state/actions/navigation.actions';

@Component({
  selector: 'bus-entity',
  templateUrl: './bus-entity.component.html',
  styleUrls: ['./bus-entity.component.css'],
  providers: [LiveDataStore]
})
export class BusEntityComponent implements OnInit, OnDestroy {

  public buses$!: Observable<IArrival[] | undefined>;
  public currentLine$!: Observable<ILine | undefined>;
  public sendBuses!: Subscription;

  constructor(private store: Store<AppState>, 
              private liveStore: LiveDataStore,
              private dataShare: DataShareService) { }
  
  ngOnInit(): void {
    this.currentLine$ = this.store.select(currentLine);
    this.liveStore.fetchBusLocations(this.currentLine$);
    this.buses$ = this.liveStore.getBusLocations();
    this.sendBuses = this.buses$.subscribe(buses => this.dataShare.sendBusStatus(buses!));
  }

  ngOnDestroy(): void {
    this.sendBuses.unsubscribe();
  }

  public selectBus(bus: IArrival){
    this.dataShare.fly([bus.latitude, bus.longitude]);
  }

  public navigate(){
    this.dataShare.slide(0);
  }

}
