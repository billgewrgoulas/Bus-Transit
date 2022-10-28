import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/state/reducers/api-reducer';
import { getRouteStations } from 'src/app/state/selectors/appState.selectors';
import { IStation } from 'src/app/state/entities/stop.entity';

@Component({
  selector: 'station-list-component',
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.css']
})
export class StationListComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  public currentRouteStations$!: Observable<IStation[]>;

  ngOnInit(): void {
    this.currentRouteStations$ = this.store.select(getRouteStations);
  }
  
}
