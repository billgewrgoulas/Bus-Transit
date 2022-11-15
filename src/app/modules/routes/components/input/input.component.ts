import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map, Observable, of, Subscription } from 'rxjs';
import { DataShareService } from 'src/app/services/data-share.service';
import { IStop } from 'src/app/state/entities/stop.entity';
import { AppState } from 'src/app/state/reducers/api-reducer';
import { filterStops } from 'src/app/state/selectors/appState.selectors';
import * as api_actions from '../../../../state/actions/api-calls.actions';
import * as navigation from '../../../../state/actions/navigation.actions';
import * as map_actions from '../../../../state/actions/map.actions';
import { Router } from '@angular/router';
import { DirectionsStore } from 'src/app/state/componentStore/directions.store';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit, OnDestroy {

  public sub!: Subscription;
  public obs$!: Observable<any>;
  public ob$!: Observable<any>;

  public startValue: string = '';
  public endValue: string = '';
  
  public destFlag: boolean = false;
  public startFlag: boolean = false;
  public default: boolean = true;

  constructor(
    private store: Store<AppState>, 
    private msg: DataShareService, 
    private local: DirectionsStore,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.obs$ = this.local.getNames();
    this.sub = this.msg.markerObserver.subscribe(e => this.onSelect(e));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public swap(){
    let temp = this.endValue;
    this.endValue = this.startValue;
    this.startValue = temp;
    this.local.swapPoints();
  }

  public destKeyUp(){
    this.msg.onKeyUp(this.endValue);
  }

  public startKeyUp(){
    this.msg.onKeyUp(this.startValue);
  }

  public startClick(){
    this.default = false;
    this.startFlag = true;
    this.startKeyUp();
    this.updateOnclick('start');
  }

  public destClick(){
    this.default = false;
    this.destFlag = true;
    this.destKeyUp();
    this.updateOnclick('dest');
  }

  public cancel(){
    this.default = true;
    this.destFlag = false;
    this.startFlag = false;
    this.msg.showDefault(true);
    this.navigate();
  }

  public clearStart(){
    this.startValue = '';
    this.startKeyUp();
    this.local.updatePoint([]);
  }

  public clearDest(){
    this.endValue = '';
    this.destKeyUp();
    this.local.updatePoint([]);
  }

  public navigate(){
    this.store.dispatch(navigation.arrowNavigation());
  }

  public onSelect(data: string[]){

    if(this.destFlag){
      this.endValue = data[1];
    }else if(this.startFlag){
      this.startValue = data[1];
    }

    this.cancel();
  }

  private updateOnclick(dest: string){
    this.msg.showDefault(false);
    this.local.changeDirection(dest);
    this.router.navigate([{ outlets: { sidebar: [ 'routes', 'places'] }}]);
  }

}
