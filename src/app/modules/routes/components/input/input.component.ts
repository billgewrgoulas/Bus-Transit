import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Observable, Subscription, tap } from 'rxjs';
import { DataShareService } from 'src/app/services/data-share.service';
import { AppState } from 'src/app/state/Reducers/api-reducer';
import * as navigation from '../../../../state/Actions/navigation.actions';
import { Router } from '@angular/router';
import { DirectionsStore } from 'src/app/state/LocalStore/directions.store';
import * as select_actions from '../../../../state/Actions/select.actions';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [DirectionsStore]
})
export class InputComponent implements OnInit, OnDestroy {

  public obs$!: Observable<any>;
  public subs: Subscription[] = [];

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
  ) {}
  
  ngOnInit(): void {

    this.subs = [
      this.msg.tabObserver.subscribe(v => this.cancel()),
      this.msg.dragStartObserver.subscribe(v => this.onDrag(v, 'start')),
      this.msg.dragEndObserver.subscribe(v => this.onDrag(v, 'dest'))
    ];

    this.obs$ = this.local.getNames();
    this.checkUrl();
  }

  ngOnDestroy(): void{
    this.local.updateStrategy('clear');
    this.subs.forEach(sub => sub.unsubscribe());
  }

  public swap(){
    this.local.swapPoints();
  }

  public keyUp(value: string){
    this.msg.onKeyUp(value);
  }

  public startClick(){
    this.default = false;
    this.startFlag = true;
    this.keyUp(this.startValue);
    this.updateOnclick('start');
  }

  public destClick(){
    this.default = false;
    this.destFlag = true;
    this.keyUp(this.endValue);
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
    this.keyUp('');
    this.local.updatePoint([]);
    this.store.dispatch(select_actions.emptyPlan());
  }

  public clearDest(){
    this.endValue = '';
    this.keyUp('');
    this.local.updatePoint([]);
    this.store.dispatch(select_actions.emptyPlan());
  }

  public navigate(){
    this.store.dispatch(navigation.arrowNavigation());
  }

  private updateOnclick(dest: string){
    this.msg.showDefault(false);
    this.local.changeDirection(dest);
    this.router.navigate([{ outlets: { sidebar: [ 'routes', 'places'] }}], {queryParams: {module: dest + '_input'}});
  }

  private onDrag(point: string[], direction: string){
    this.local.changeDirection(direction);
    this.local.updatePoint(point);
    this.local.changeDirection('');
  }

  private checkUrl(){
    const queryParam: string = this.router.url.split("=")[1];
    if(queryParam == 'start_input'){
      this.startClick();
    }else if(queryParam == 'dest_input'){
      this.destClick();
    }
  }

}
