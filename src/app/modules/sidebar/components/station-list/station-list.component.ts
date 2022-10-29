import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/state/reducers/api-reducer';
import { getRouteStops } from 'src/app/state/selectors/appState.selectors';
import { IStop } from 'src/app/state/entities/stop.entity';

@Component({
  selector: 'station-list-component',
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.css']
})
export class StationListComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  public currentRouteStops$!: Observable<IStop[]>;

  ngOnInit(): void {
    this.currentRouteStops$ = this.store.select(getRouteStops);
  }
  
}
