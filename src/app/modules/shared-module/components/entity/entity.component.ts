import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IBus } from 'src/app/state/entities/bus.entity';
import { IStation } from 'src/app/state/entities/station.entity';
import { AppState } from 'src/app/state/reducers/api-reducer';
import { getActiveStation, getRouteVeh } from 'src/app/state/selectors/appState.selectors';
import * as actions from '../../../../state/actions/api-calls.actions';

@Component({
  selector: 'entity-component',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.css']
})
export class EntityComponent implements OnInit {

  public buses$!: Observable<IBus[] | undefined>;
  public stop$!: Observable<IStation | undefined>;

  @Input() public module: string = '';

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {

    if(this.module === 'bus'){
      this.buses$ = this.store.select(getRouteVeh);
    }else if(this.module === 'stop'){
      this.stop$ = this.store.select(getActiveStation);
    }

  }

  public focus(busCode: string){
    this.store.dispatch(actions.requests.selectBus({busCode: busCode}));
  }

}
