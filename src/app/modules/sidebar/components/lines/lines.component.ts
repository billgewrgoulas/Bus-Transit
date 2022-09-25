import { Component, OnInit } from '@angular/core';
import * as actions from '../../../../state/actions/api-calls.actions';
import * as navigation from'../../../../state/actions/navigation.actions';
import * as sockets from '../../../../state/actions/socketIO.actions';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/reducers/api-reducer';
import { filter, Observable } from 'rxjs';
import { filterDropdown } from 'src/app/state/selectors/appState.selectors';
import { ILine } from 'src/app/state/entities/line.entity';

@Component({
  selector: 'lines-component',
  templateUrl: './lines.component.html',
  styleUrls: ['./lines.component.css']
})
export class LinesComponent implements OnInit {

  public value: string = '';
  public lines$!: Observable<ILine[]>;
  public selected: boolean = false;

  constructor(private router: Router, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.lines$ = this.store.select(filterDropdown(this.value));
  }

  public filter(){
    this.lines$ = this.store.select(filterDropdown(this.value));
  }

  public changeValue(line: ILine){
    this.value = line.line_descr;
    this.selected = true;
    this.router.navigate([{ outlets: { sidebar: [ 'lines', line.line_code ] }}]);
  }

  public clear(){
    this.value = '';
    this.selected = false;
    this.router.navigateByUrl('(sidebar:lines)');
  }

  public navigate(){
    this.selected = false;
    this.store.dispatch(navigation.nav_actions.arrowNavigation());
  }

}
