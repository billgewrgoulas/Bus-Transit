import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IRoute } from 'src/app/state/entities/route.entity';
import { AppState } from 'src/app/state/reducers/api-reducer';
import { selectCurrentLineRoutes } from 'src/app/state/selectors/appState.selectors';

@Component({
  selector: 'route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.css']
})
export class RouteListComponent implements OnInit {

  public routes$!: Observable<IRoute[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.routes$ = this.store.select(selectCurrentLineRoutes);
  }

}
