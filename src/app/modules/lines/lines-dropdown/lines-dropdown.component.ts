import { Component, OnInit } from '@angular/core';
import * as navigation from'../../../state/Actions/navigation.actions';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/Reducers/api-reducer';
import { filter, Observable, startWith } from 'rxjs';
import { currentRoute, filterLines } from 'src/app/state/Selectors/appState.selectors';
import { ILine } from 'src/app/state/Entities/line.entity';
import { IRoute } from 'src/app/state/Entities/route.entity';
import { slideAnimation } from 'src/app/route-animations';

@Component({
  selector: 'app-lines-dropdown',
  templateUrl: './lines-dropdown.component.html',
  styleUrls: ['./lines-dropdown.component.css']
})
export class LinesDropdownComponent implements OnInit {

  public value: string = '';
  public lines$!: Observable<ILine[]>;
  public activeRoute$!: Observable<IRoute | undefined>;
  public currentLine: ILine | undefined;

  constructor(private router: Router, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.lines$ = this.store.select(filterLines(this.value));
    this.activeRoute$ = this.store.select(currentRoute).pipe(
      startWith(<IRoute>{}),
      filter(e => !!e)
    );
  }

  public changeValue(line: ILine){
    this.currentLine = line;
    this.value = `Line ${line.name}`;
    this.router.navigate([{ outlets: { sidebar: [ 'lines', line.id ] }}], {queryParams: {module: 'line_data'}});
  }

  public clear(){
    this.value = '';
    this.lines$ = this.store.select(filterLines(this.value));
  }

  public navigate(){
    this.store.dispatch(navigation.arrowNavigation());
    this.value = this.currentLine?.desc!;
  }

  public onKeyUp(){
    this.lines$ = this.store.select(filterLines(this.value));
  }

  public outletActive(e$: Object){
  }

  public prepareOutlet(outlet: RouterOutlet){
    return outlet && outlet.activatedRouteData;
  }

}
