import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable} from 'rxjs';
import { DataShareService } from 'src/app/services/data-share.service';
import { IArrivalDetails } from 'src/app/state/entities/arival.entity';
import { IArrivalInfo } from 'src/app/state/entities/dataInterfaces';
import { IStation } from 'src/app/state/entities/stop.entity';
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

  public arrivals$!: Observable<IArrivalDetails[] | undefined>;

  constructor(private store: Store<AppState>, private dataShare: DataShareService) { }

  ngOnInit(): void {
    this.arrivals$ = this.store.select(stopSchedule(this.station.StopCode));
  }

  public selectStop(){
    this.store.dispatch(actions.requests.selectStation({stopCode: this.station.StopCode}));
    this.store.dispatch(actions.requests.selectBus({busCode: ''}));
    this.dataShare.slide(2);
  }

}
