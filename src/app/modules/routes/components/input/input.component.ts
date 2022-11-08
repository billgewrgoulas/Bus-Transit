import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DataShareService } from 'src/app/services/data-share.service';
import { IStop } from 'src/app/state/entities/stop.entity';
import { AppState } from 'src/app/state/reducers/api-reducer';
import { MapState } from 'src/app/state/reducers/map.reducer';
import { filterStops } from 'src/app/state/selectors/appState.selectors';
import * as api_actions from '../../../../state/actions/api-calls.actions';
import * as navigation from '../../../../state/actions/navigation.actions';
import * as map_actions from '../../../../state/actions/map.actions';

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

  public destFlag: boolean = false;
  public startFlag: boolean = false;
  public default: boolean = true;

  constructor(private store: Store<AppState>, private msg: DataShareService, private mapStore: Store<MapState>) { }

  ngOnInit(): void {
    this.stops$ = this.store.select(filterStops(this.startValue));
  }

  public swap(){

    let temp = [...this.start];
    this.start = [...this.end];
    this.end = [...temp];

    let tempV = this.startValue;
    this.startValue = this.endValue;
    this.endValue = tempV;
  
  }

  public onClick(data: string[]){

    if(this.destFlag){
      this.end = data;
      this.endValue = data[1];
      this.mapStore.dispatch(map_actions.addEnd({data: data}));
    }else if(this.startFlag){
      this.start = data;
      this.startValue = data[1];
      this.mapStore.dispatch(map_actions.addStart({data: data})); //fix this, just use the service and pass the type
    }

    this.cancel();
    this.store.dispatch(api_actions.getFilteredStops({stopCode: data[0]}));
  }

  public startKeyUp(){
    this.default = false;
    this.startFlag = true;
    this.stops$ = this.store.select(filterStops(this.startValue));
  }

  public destKeyUp(){
    this.default = false;
    this.destFlag = true;
    this.stops$ = this.store.select(filterStops(this.endValue));
  }

  public cancel(){
    this.default = true;
    this.destFlag = false;
    this.startFlag = false;
  }

  public clearStart(){
    this.startValue = '';
    this.stops$ = this.store.select(filterStops(this.startValue));
  }

  public clearDest(){
    this.endValue = '';
    this.stops$ = this.store.select(filterStops(this.endValue));
  }

  public navigate(){
    this.mapStore.dispatch(map_actions.removeEnds());
    this.store.dispatch(navigation.arrowNavigation()); //move it to router effects
  }

}
