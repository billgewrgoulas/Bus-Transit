import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IRoute } from 'src/app/state/Entities/route.entity';
import { AppState } from 'src/app/state/Reducers/api-reducer';
import { filterCurrentLineRoutes, selectCurrentLineRoutes } from 'src/app/state/Selectors/appState.selectors';

@Component({
  selector: 'route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.css']
})
export class RouteListComponent implements OnInit {

  public value: string = '';
  public routes$!: Observable<IRoute[]>;

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.routes$ = this.store.select(filterCurrentLineRoutes(this.value));
  }

  public filter(){
    this.routes$ = this.store.select(filterCurrentLineRoutes(this.value));
  }

  public onSelect(slug: string[]){
    this.router.navigate([{ outlets: { sidebar: slug }}], {queryParams: {module: 'route_data'}});
  }

}
