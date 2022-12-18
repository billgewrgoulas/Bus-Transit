import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ILine } from 'src/app/state/Entities/line.entity';
import { IRoute } from 'src/app/state/Entities/route.entity';
import { AppState } from 'src/app/state/Reducers/api-reducer';
import { currentLine, selectCurrentLineRoutes } from 'src/app/state/Selectors/appState.selectors';

@Component({
  selector: 'route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.css']
})
export class RouteListComponent implements OnInit {

  public routes$!: Observable<IRoute[]>;
  public line$!: Observable<ILine | undefined>;

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.routes$ = this.store.select(selectCurrentLineRoutes);
    this.line$ = this.store.select(currentLine);
  }

  public onSelect(slug: string[]){
    this.router.navigate([{ outlets: { sidebar: slug }}], {queryParams: {module: 'route_data'}});
  }

}
