import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DataShareService } from 'src/app/services/data-share.service';
import { IArrivalDetails } from 'src/app/state/entities/arival.entity';
import { IStation } from 'src/app/state/entities/stop.entity';
import { AppState } from 'src/app/state/reducers/api-reducer';
import { currentStopSchedule, getActiveStation } from 'src/app/state/selectors/appState.selectors';
import * as navigation from'../../../../state/actions/navigation.actions';
import * as actions from '../../../../state/actions/api-calls.actions';

@Component({
  selector: 'station-entity',
  templateUrl: './station-entity.component.html',
  styleUrls: ['./station-entity.component.css'],
})
export class StationEntityComponent implements OnInit {

  public station$: Observable<IStation | undefined> | undefined;
  public arrival$!: Observable<IArrivalDetails | undefined>;

  constructor(private store: Store<AppState>, private dataShare: DataShareService) { }

  ngOnInit(): void {
    this.station$ = this.store.select(getActiveStation);
    this.arrival$ = this.store.select(currentStopSchedule);
  }

  public swapTab(){
    this.dataShare.slide(0);
  }

  public navigate(){
    this.store.dispatch(navigation.nav_actions.arrowNavigation());
  }

  public bookStop(stop: IStation){

    if(stop.Booked){
      this.store.dispatch(actions.requests.bookStop());
    }else{
      this.store.dispatch(actions.requests.unbookStop());
    }


  }

}
