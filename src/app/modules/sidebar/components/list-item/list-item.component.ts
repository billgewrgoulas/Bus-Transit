import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Observable, take, takeLast} from 'rxjs';
import { MapService } from 'src/app/services/map.service';
import { SocketIOService } from 'src/app/services/socket-io.service';
import { IArrival, IArrivalInfo, IStation } from 'src/app/state/entities/dataInterfaces';
import { AppState } from 'src/app/state/reducers/api-reducer';
import { stopSchedule } from 'src/app/state/selectors/appState.selectors';
import * as actions from '../../../../state/actions/api-calls.actions';

@Component({
  selector: 'list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  @Input() public station!: IStation;
  @Input() public isLast: boolean = false;

  public arrivals$!: Observable<IArrivalInfo[] | undefined>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.arrivals$ = this.store.select(stopSchedule(this.station.stationCode));
  }

  public fetchSchedule(){
    this.store.dispatch(actions.requests.getStationsArrivals({stopCode: this.station.stationCode}));
  }

}
