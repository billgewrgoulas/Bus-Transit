import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map, tap } from 'rxjs';
import { IArrival } from 'src/app/state/Entities/live.data';
import { IStop } from 'src/app/state/Entities/stop.entity';
import { AppState } from 'src/app/state/Reducers/api-reducer';
import { getActiveStop } from 'src/app/state/Selectors/appState.selectors';
import { OriginStore } from '../../state/bookingOrigin';
import { DataService } from 'src/app/services/data.service';
import { DataShareService } from 'src/app/services/data-share.service';

interface Data{
  arrivals: IArrival[],
  stop: IStop | undefined
}

@Component({
  selector: 'bookin-origin',
  templateUrl: './bookin-origin.component.html',
  styleUrls: ['./bookin-origin.component.css'],
  providers: [OriginStore]
})
export class BookinOriginComponent implements OnInit {

  public vm$!: Observable<Data>;

  constructor(
    private store: Store<AppState>, 
    private localStore: OriginStore,
    private msg: DataShareService
  ){}

  ngOnInit(): void {
    this.vm$ = combineLatest([
      this.store.select(getActiveStop),
      this.localStore.getArrivalState()
    ]).pipe(
      map(([stop, arrivals]) => ({arrivals: arrivals, stop: stop})), 
      tap((data: Data) => this.initMarker(data.stop, data.arrivals))
    );
    this.localStore.fetchArrivals(this.store.select(getActiveStop));
  }

  public initMarker(stop: IStop | undefined, arrivals: IArrival[]){

    if(!stop){
      return;
    }

    this.msg.sendOrigin(stop);
    this.msg.sendBusStatus(arrivals);
  }

}
