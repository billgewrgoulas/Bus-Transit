import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IRoute } from 'src/app/state/Entities/route.entity';
import { AppState } from 'src/app/state/Reducers/api-reducer';
import { getRouteList, selectCurrentLineRoutes } from 'src/app/state/Selectors/appState.selectors';

@Component({
  selector: 'route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.css'],
})
export class RouteListComponent implements OnInit {

  @Input() public module: string = '';

  public title: string = '';
  public routes$!: Observable<IRoute[]>;

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {

    if(this.module == 'line_module'){
      this.title = 'Routes';
      this.routes$ = this.store.select(selectCurrentLineRoutes);
    }else if(this.module == 'route_module'){
      this.title = 'Suggested routes'
      this.routes$ = this.store.select(getRouteList);
    }
    
  }

  public onSelect(data: string[]){

    let link: string[] = [];
    if(this.module == 'line_module'){
      link = ['lines', data[0], 'route', data[1]];
    }else if(this.module == 'route_module'){
      link = ['routes', 'search', data[1]];
    }

    this.router.navigate([{ outlets: { sidebar: link }}], {queryParams: {module: 'route_data'}});
  }

}
