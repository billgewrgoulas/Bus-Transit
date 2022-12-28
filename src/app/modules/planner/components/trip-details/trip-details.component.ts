import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map } from 'rxjs';
import { Itinerary } from 'src/app/state/Entities/itinerary';
import { AppState } from 'src/app/state/Reducers/api-reducer';
import { selectItinerary, spinner } from 'src/app/state/Selectors/appState.selectors';
import * as select_actions from 'src/app/state/Actions/select.actions';
import * as api_actions from 'src/app/state/Actions/api-calls.actions';
import { DataShareService } from 'src/app/services/data-share.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { DirectionsStore } from 'src/app/modules/planner/state/directions.store';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit, OnDestroy {

  public vm$!: Observable<any>;

  public arrows: any = {
    RIGHT: 'turn_right', LEFT: 'turn_left', DEPART: 'arrow_upward',
    SLIGHTLY_LEFT: 'turn_slight_left', SLIGHTLY_RIGHT: 'turn_slight_right',
    CIRCLE_CLOCKWISE: 'roundabout_right', CIRCLE_COUNTERCLOCKWISE: 'roundabout_left',
    UTURN_RIGHT: 'u_turn_right', UTURN_LEFT: 'u_turn_left',
    CONTINUE: 'arrow_upward', HARD_LEFT: 'turn_sharp_left', HARD_RIGHT: 'turn_sharp_right'
  };

  public directions: any = {
    RIGHT: 'Right on to', LEFT: 'Left on to', DEPART: 'Start on',
    SLIGHTLY_LEFT: 'Slightly left on to', SLIGHTLY_RIGHT: 'Slightly right on to',
    CIRCLE_CLOCKWISE: 'Take roundabout to ', CIRCLE_COUNTERCLOCKWISE: 'Take roundabout to',
    UTURN_RIGHT: 'U turn right to', UTURN_LEFT: 'U turn left to',
    CONTINUE: 'Continue to', HARD_LEFT: 'Sharp left to', HARD_RIGHT: 'Sharp right to'
  };

  constructor(
    private store: Store<AppState>, 
    private msg: DataShareService, 
  ) { }

  ngOnInit(): void {
    this.vm$ = combineLatest([
      this.store.select(selectItinerary), this.store.select(spinner)
    ]).pipe(map(([itinerary, spinner]) => ({itinerary, spinner})));
  }

  ngOnDestroy(): void{
    this.store.dispatch(select_actions.selectItinerary({index: -1}));
  }

  public focus(x: number, y: number){
    this.msg.fly([x+'', y+'']);
  }

}
