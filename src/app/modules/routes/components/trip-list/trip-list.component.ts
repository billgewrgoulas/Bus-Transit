import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Plan } from 'src/app/state/Entities/itinerary';
import { AppState } from 'src/app/state/Reducers/api-reducer';
import { getPlanState } from 'src/app/state/Selectors/appState.selectors';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit {

  public plan!: Observable<Plan | undefined>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.plan = this.store.select(getPlanState);
  }

}
