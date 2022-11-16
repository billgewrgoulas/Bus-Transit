import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, takeLast } from 'rxjs';
import { DataShareService } from 'src/app/services/data-share.service';
import { LiveDataStore } from 'src/app/state/LocalStore/live.data.store';
import { ILine } from 'src/app/state/Entities/line.entity';
import { IArrival } from 'src/app/state/Entities/live.data';
import { AppState } from 'src/app/state/Reducers/api-reducer';
import { currentLine } from 'src/app/state/Selectors/appState.selectors';
import * as navigation from'../../../../state/Actions/navigation.actions';

@Component({
  selector: 'bus-entity',
  templateUrl: './bus-entity.component.html',
  styleUrls: ['./bus-entity.component.css'],
  providers: [LiveDataStore]
})
export class BusEntityComponent implements OnInit {

  public buses$!: Observable<IArrival[] | undefined>;
  public currentLine$!: Observable<ILine | undefined>;

  constructor(private store: Store<AppState>, 
              private liveStore: LiveDataStore,
              private dataShare: DataShareService) { }
  
  ngOnInit(): void {
    this.currentLine$ = this.store.select(currentLine);
    this.liveStore.fetchBusLocations(this.currentLine$);
    this.buses$ = this.liveStore.getBusLocations();
  }

  public selectBus(bus: IArrival){
    this.dataShare.fly([bus.latitude, bus.longitude]);
  }

  public navigate(){
    this.dataShare.slide(0);
  }

}
