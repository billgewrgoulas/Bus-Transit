import { Component, OnInit } from '@angular/core';
import * as navigation from'../../../../state/actions/navigation.actions';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/reducers/api-reducer';
import { Observable } from 'rxjs';
import { getAllLines } from 'src/app/state/selectors/appState.selectors';
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
    this.lines$ = this.store.select(getAllLines);
  }

  public changeValue(line: ILine){
    this.value = line.desc;
    this.router.navigate([{ outlets: { sidebar: [ 'lines', line.id ] }}]);
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

  public outletActive(e$: Object){
    this.selected = true;
  }

}
