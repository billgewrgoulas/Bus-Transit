import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DataShareService } from 'src/app/services/data-share.service';
import { IStop } from 'src/app/state/entities/stop.entity';
import { AppState } from 'src/app/state/reducers/api-reducer';
import * as navigation from'../../../../state/actions/navigation.actions';
import * as actions from '../../../../state/actions/api-calls.actions';
import { getActiveStop } from 'src/app/state/selectors/appState.selectors';
import { LiveDataStore } from 'src/app/state/componentStore/live.data.store';
import { IArrival } from 'src/app/state/entities/live.data';

@Component({
  selector: 'station-entity',
  templateUrl: './station-entity.component.html',
  styleUrls: ['./station-entity.component.css'],
  providers: [LiveDataStore]
})
export class StationEntityComponent implements OnInit {

  public stop$!: Observable<IStop | undefined>;
  public arrivals$!: Observable<IArrival[]>;

  constructor(private store: Store<AppState>, 
              private dataShare: DataShareService,
              private liveStore: LiveDataStore) { }

  ngOnInit(): void {
    this.stop$ = this.store.select(getActiveStop);
    this.liveStore.fetchArrivals(this.stop$);
    this.arrivals$ = this.liveStore.getStopArrivals();
  }

  public swapTab(){
    this.dataShare.slide(0);
  }
  
}
