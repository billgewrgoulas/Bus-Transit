import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, takeLast } from 'rxjs';
import { IBus } from 'src/app/state/entities/bus.entity';
import { AppState } from 'src/app/state/reducers/api-reducer';
import * as actions from '../../../../state/actions/api-calls.actions';
import { getRouteVeh } from 'src/app/state/selectors/appState.selectors';

@Component({
  selector: 'bus-entity',
  templateUrl: './bus-entity.component.html',
  styleUrls: ['./bus-entity.component.css']
})
export class BusEntityComponent implements OnInit {

  public buses$: Observable<IBus[] | undefined> | undefined;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.buses$ = this.store.select(getRouteVeh);
  }

  public selectBus(busCode: string){
    this.store.dispatch(actions.requests.selectBus({busCode: busCode}));
  }

}
