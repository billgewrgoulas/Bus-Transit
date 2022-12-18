import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { DataShareService } from 'src/app/services/data-share.service';
import { Plan } from 'src/app/state/Entities/itinerary';
import { DirectionsStore } from 'src/app/state/LocalStore/directions.store';
import { AppState } from 'src/app/state/Reducers/api-reducer';
import { getPlanState } from 'src/app/state/Selectors/appState.selectors';
import * as api_actions from 'src/app/state/Actions/api-calls.actions';

@Component({
  selector: 'trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit {

  public plan$!: Observable<Plan | undefined>;

  constructor(
    private store: Store<AppState>, 
    private router: Router, 
    private local: DirectionsStore,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.plan$ = this.store.select(getPlanState);
    this.local.initFetch();
  }

  public onSelect(itinerary: number){
    this.router.navigate([{ outlets: { sidebar: [ 'routes', 'trips', itinerary] }}], 
      {queryParams: {module: 'trip_details'}
    });
  }

  public onBook(itinerary: number){
    this.store.dispatch(api_actions.book({email: this.auth.getUserInfo().email, it: itinerary}));
  }

}
