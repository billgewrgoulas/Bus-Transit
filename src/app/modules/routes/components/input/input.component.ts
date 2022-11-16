import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Observable, Subscription, tap } from 'rxjs';
import { DataShareService } from 'src/app/services/data-share.service';
import { AppState } from 'src/app/state/Reducers/api-reducer';
import * as navigation from '../../../../state/Actions/navigation.actions';
import { Router } from '@angular/router';
import { DirectionsStore } from 'src/app/state/LocalStore/directions.store';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {

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
    this.obs$ = this.local.getNames().pipe(
      tap((data) => this.updateValues(data))
    );
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

  public updateValues(data: any){
    this.endValue = data.end;
    this.startValue = data.start;
  }

  private updateOnclick(dest: string){
    this.msg.showDefault(false);
    this.local.changeDirection(dest);
    this.router.navigate([{ outlets: { sidebar: [ 'routes', 'places'] }}]);
  }

}
