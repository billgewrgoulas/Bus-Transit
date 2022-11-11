import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { DataShareService } from 'src/app/services/data-share.service';
import { IStop } from 'src/app/state/entities/stop.entity';
import { AppState } from 'src/app/state/reducers/api-reducer';
import { filterStops } from 'src/app/state/selectors/appState.selectors';
import * as api_actions from '../../../../state/actions/api-calls.actions';
import * as navigation from '../../../../state/actions/navigation.actions';
import * as map_actions from '../../../../state/actions/map.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit, OnDestroy {

  private endPointSub!: Subscription;
  public startValue: string = '';
  public endValue: string = '';

  public destFlag: boolean = false;
  public startFlag: boolean = false;
  public default: boolean = true;

  constructor(private store: Store<AppState>, private router: Router, private msg: DataShareService) { }
  
  ngOnInit(): void {
    this.endPointSub = this.msg.markerObserver.subscribe(v => this.onClick(v));
  }

  ngOnDestroy(): void{
    this.endPointSub.unsubscribe();
  }

  public swap(){
    let tempV = this.startValue;
    this.startValue = this.endValue;
    this.endValue = tempV;
    this.store.dispatch(map_actions.swapPoints());
  }

  public onClick(data: string[]){

    if(this.destFlag){
      this.endValue = data[1];
      this.store.dispatch(map_actions.addEnd({data: data}));
    }else if(this.startFlag){
      this.startValue = data[1];
      this.store.dispatch(map_actions.addStart({data: data})); 
    }

    this.cancel();
  }

  public startKeyUp(){
    this.default = false;
    this.startFlag = true;
    this.msg.showDefault(false);
  }

  public destKeyUp(){
    this.default = false;
    this.destFlag = true;
    this.msg.showDefault(false);
  }

  public cancel(){
    this.default = true;
    this.destFlag = false;
    this.startFlag = false;
    this.msg.showDefault(true);
  }

  public clearStart(){
    this.startValue = '';
  }

  public clearDest(){
    this.endValue = '';
  }

  public navigate(){
    this.store.dispatch(navigation.arrowNavigation());
  }

}
