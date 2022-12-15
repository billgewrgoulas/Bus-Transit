import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { DataShareService } from 'src/app/services/data-share.service';
import { Plan } from 'src/app/state/Entities/itinerary';
import { DirectionsStore } from 'src/app/state/LocalStore/directions.store';
import { AppState } from 'src/app/state/Reducers/api-reducer';
import { getPlanState } from 'src/app/state/Selectors/appState.selectors';

@Component({
  selector: 'trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit {

  public plan$!: Observable<Plan | undefined>;
  public subs: Subscription[] = [];

  constructor(
    private store: Store<AppState>, 
    private router: Router, 
    private local: DirectionsStore,
    private msg: DataShareService
  ) { }

  ngOnInit(): void {
    this.plan$ = this.store.select(getPlanState);
    this.local.initFetch();
    this.subs = [
      this.msg.dragStartObserver.subscribe(() => this.local.initFetch()),
      this.msg.dragEndObserver.subscribe(() => this.local.initFetch())
    ];
  }

  public onSelect(itinerary: number){
    this.router.navigate([{ outlets: { sidebar: [ 'routes', 'trips', itinerary] }}], 
      {queryParams: {module: 'trip_details'}
    });
  }

}
