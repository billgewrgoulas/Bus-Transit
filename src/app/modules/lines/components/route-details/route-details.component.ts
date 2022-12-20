import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IRoute } from 'src/app/state/Entities/route.entity';
import { LiveDataStore } from 'src/app/modules/lines/state/live.data.store';
import { AppState } from 'src/app/state/Reducers/api-reducer';
import { currentRoute } from 'src/app/state/Selectors/appState.selectors';

@Component({
  selector: 'route-details',
  templateUrl: './route-details.component.html',
  styleUrls: ['./route-details.component.css'],
  providers: [LiveDataStore]
})
export class RouteDetailsComponent implements OnInit {

  public route$!: Observable<IRoute | undefined>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.route$ = this.store.select(currentRoute);
  }

}
