import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DataShareService } from 'src/app/services/data-share.service';
import { IStop } from 'src/app/state/entities/stop.entity';
import { AppState } from 'src/app/state/reducers/api-reducer';
import { filterStops } from 'src/app/state/selectors/appState.selectors';
import * as api_actions from '../../../../state/actions/api-calls.actions';
import * as navigation from '../../../../state/actions/navigation.actions';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  public stops$!: Observable<IStop[]>;
  public start: string[] = [];
  public end: string[] = [];
  public startValue: string = '';
  public endValue: string = '';

  constructor(private store: Store<AppState>, private msg: DataShareService) { }

  ngOnInit(): void {
    this.stops$ = this.store.select(filterStops(this.startValue));
  }

  public swap(){
    const temp = [...this.start];
    this.start = [...this.end];
    this.end = [...temp];
  }

  public onClick(data: string[]){
    this.msg.fly([data[2], data[3]]);
    this.store.dispatch(api_actions.getFilteredStops({stopCode: data[0]}));
  }

  public startKeyUp(){
    this.stops$ = this.store.select(filterStops(this.startValue));
  }

  public destKeyUp(){
    this.stops$ = this.store.select(filterStops(this.endValue));
  }

  public navigate(){
    this.store.dispatch(navigation.arrowNavigation());
  }

}
