import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DataShareService } from 'src/app/services/data-share.service';
import { IStop } from 'src/app/state/Entities/stop.entity';
import { AppState } from 'src/app/state/Reducers/api-reducer';
import * as navigation from'../../../../state/Actions/navigation.actions';
import * as actions from '../../../../state/Actions/api-calls.actions';
import { getActiveStop } from 'src/app/state/Selectors/appState.selectors';
import { LiveDataStore } from 'src/app/modules/lines/state/live.data.store';
import { IArrival } from 'src/app/state/Entities/live.data';

@Component({
  selector: 'station-entity',
  templateUrl: './station-entity.component.html',
  styleUrls: ['./station-entity.component.css'],
})
export class StationEntityComponent implements OnInit {

  public stop$!: Observable<IStop | undefined>;

  @Input() public arrivals!: IArrival[];
  @Output() public onClick = new EventEmitter<number>();

  constructor(
    private store: Store<AppState>, 
    private dataShare: DataShareService,
  ) { }

  ngOnInit(): void {
    this.stop$ = this.store.select(getActiveStop);
  }

  public swapTab(){
    this.onClick.emit(0);
  }

  public flyToStop(point: IStop){
    this.dataShare.fly([point.latitude, point.longitude]);
  }
  
}
