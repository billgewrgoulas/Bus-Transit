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
  public sub!: Subscription;

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
    this.sub = this.msg.tabObserver.subscribe(v => this.cancel());
    this.obs$ = this.local.getNames();
  }

  ngOnDestroy(): void{
    this.sub.unsubscribe();
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
  }

  public clearDest(){
    this.endValue = '';
    this.keyUp('');
    this.local.updatePoint([]);
  }

  public navigate(){
    this.store.dispatch(navigation.arrowNavigation());
  }

  private updateOnclick(dest: string){
    this.msg.showDefault(false);
    this.local.changeDirection(dest);
    this.router.navigate([{ outlets: { sidebar: [ 'routes', 'places'] }}]);
  }

}
