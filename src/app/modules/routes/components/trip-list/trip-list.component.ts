import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Plan } from 'src/app/state/Entities/itinerary';
import { AppState } from 'src/app/state/Reducers/api-reducer';
import { getPlanState } from 'src/app/state/Selectors/appState.selectors';

@Component({
  selector: 'trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit {

  public plan$!: Observable<Plan | undefined>;

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.plan$ = this.store.select(getPlanState);
  }

  public onSelect(itinerary: number){
    this.router.navigate([{ outlets: { sidebar: [ 'routes', 'trips', itinerary] }}], 
      {queryParams: {module: 'trip_details'}
    });
  }

}
