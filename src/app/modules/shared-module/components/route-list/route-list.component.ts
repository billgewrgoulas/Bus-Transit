import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IRoute } from 'src/app/state/Entities/route.entity';
import { AppState } from 'src/app/state/Reducers/api-reducer';
import { selectCurrentLineRoutes } from 'src/app/state/Selectors/appState.selectors';

@Component({
  selector: 'route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.css']
})
export class RouteListComponent implements OnInit {

  public routes$!: Observable<IRoute[]>;

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.routes$ = this.store.select(selectCurrentLineRoutes);
  }

  public onSelect(data: string[]){
    const link: string[] = ['lines', data[0], 'route', data[1]];
    this.router.navigate([{ outlets: { sidebar: link }}], {queryParams: {module: 'route_click'}});
  }

}
