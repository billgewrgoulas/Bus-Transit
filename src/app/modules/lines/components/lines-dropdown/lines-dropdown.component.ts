import { Component, OnInit } from '@angular/core';
import * as navigation from'../../../../state/Actions/navigation.actions';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/Reducers/api-reducer';
import { filter, Observable, startWith } from 'rxjs';
import { currentRoute, filterLines } from 'src/app/state/Selectors/appState.selectors';
import { ILine } from 'src/app/state/Entities/line.entity';
import { IRoute } from 'src/app/state/Entities/route.entity';
import { slideAnimation } from 'src/app/route-animations';

@Component({
  selector: 'lines-dropdown',
  templateUrl: './lines-dropdown.component.html',
  styleUrls: ['./lines-dropdown.component.css']
})
export class LinesDropdownComponent implements OnInit {

  public lines$!: Observable<ILine[]>;

  constructor(private router: Router, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.lines$ = this.store.select(filterLines(''));
  }

  public changeValue(line: ILine){
    this.router.navigate([{ outlets: { sidebar: [ 'lines', line.id ] }}], {queryParams: {module: 'line_data'}});
  }

  public onKeyUp(value: string){
    this.lines$ = this.store.select(filterLines(value));
  }

  public prepareOutlet(outlet: RouterOutlet){
    return outlet && outlet.activatedRouteData;
  }

}
