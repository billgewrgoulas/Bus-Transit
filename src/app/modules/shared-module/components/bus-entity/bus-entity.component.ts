import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, takeLast } from 'rxjs';
import { AppState } from 'src/app/state/reducers/api-reducer';
import * as actions from '../../../../state/actions/api-calls.actions';
import * as navigation from'../../../../state/actions/navigation.actions';

@Component({
  selector: 'bus-entity',
  templateUrl: './bus-entity.component.html',
  styleUrls: ['./bus-entity.component.css']
})
export class BusEntityComponent implements OnInit {

  public buses$: Observable<any[] | undefined> | undefined;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    //this.buses$ = this.store.select(getBusStatus);
  }

  public selectBus(busCode: string){
    //this.store.dispatch(actions.requests.selectBus({busCode: busCode}));
  }

  public navigate(){
    this.store.dispatch(navigation.nav_actions.arrowNavigation());
  }

}
