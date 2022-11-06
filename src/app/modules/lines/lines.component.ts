import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import * as navigation from'../../state/actions/navigation.actions';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/reducers/api-reducer';
import { filter, Observable, ObservedValueOf, Subscription } from 'rxjs';
import { currentRoute, filterLines, getAllLines } from 'src/app/state/selectors/appState.selectors';
import { ILine } from 'src/app/state/entities/line.entity';
import { IRoute } from 'src/app/state/entities/route.entity';

@Component({
  selector: 'lines-component',
  templateUrl: './lines.component.html',
  styleUrls: ['./lines.component.css']
})
export class LinesComponent implements OnInit, OnDestroy {

  public value: string = '';
  public lines$!: Observable<ILine[]>;
  public selected: boolean = false;
  public activeRoute$!: Subscription;
  public currentLine: ILine | undefined;

  constructor(private router: Router, private store: Store<AppState>) { }

  ngOnDestroy(): void {
    this.activeRoute$.unsubscribe();
  }

  ngOnInit(): void {
    this.lines$ = this.store.select(filterLines(this.value));
    this.activeRoute$ = this.store.select(currentRoute).pipe(filter(e => !!e)).subscribe(e => this.value = e?.desc!);
  }

  public changeValue(line: ILine){
    this.currentLine = line;
    this.value = `Line ${line.name}`;
    this.router.navigate([{ outlets: { sidebar: [ 'lines', line.id ] }}]);
  }

  public clear(){
    this.value = '';
    this.selected = false;
    this.router.navigateByUrl('(sidebar:lines)');
  }

  public navigate(){
    this.selected = false;
    this.store.dispatch(navigation.arrowNavigation());
    this.value = this.currentLine?.desc!;
  }

  public onKeyUp(){
    this.lines$ = this.store.select(filterLines(this.value));
  }

  public outletActive(e$: Object){
    this.selected = true;
  }

}
