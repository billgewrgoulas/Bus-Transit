import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Plan } from 'src/app/state/Entities/itinerary';
import { AppState } from 'src/app/state/Reducers/api-reducer';
import { getOccupancy, getPlanState, spinner } from 'src/app/state/Selectors/appState.selectors';
import { BookingsStore } from '../../state/bookings.store';

@Component({
  selector: 'trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css'],
  providers: [BookingsStore]
})
export class TripListComponent implements OnInit {

  public vm$!: Observable<any>;
  public fetched: boolean = false;

  constructor(
    private store: Store<AppState>, 
    private router: Router, 
    private auth: AuthService,
    private local: BookingsStore
  ) { }

  ngOnInit(): void {
    this.vm$ = combineLatest([
      this.store.select(getPlanState), 
      this.local.state$, 
      this.store.select(spinner),
      this.store.select(getOccupancy)
    ]).pipe(map(([plan, state, spinner, occupancy]) => ({plan, state, spinner, occupancy})));
    this.local.dispatchBooking();
  }

  public onSelect(itinerary: number){
    this.router.navigate([{ outlets: { sidebar: [ 'routes', 'trips', itinerary] }}], 
      {queryParams: {module: 'trip_details'}
    });
  }

  public onBook(itinerary: number){
    const user: string = this.auth.getUserInfo().email;
    this.local.initBooking({user: user, it: itinerary});
  }

}
