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
})
export class InputComponent implements OnInit, OnDestroy {

  public obs$!: Observable<any>;
  public subs: Subscription[] = [];

  constructor(
    private store: Store<AppState>, 
    private msg: DataShareService, 
    private local: DirectionsStore,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.obs$ = this.local.getNames();
  }

  ngOnDestroy(): void{
    this.local.updateStrategy('clear');
    this.subs.forEach(sub => sub.unsubscribe());
  }

  public swap(){
    this.local.swapPoints();
  }

  public clear(dest: string){
    this.local.changeDirection(dest);
    this.local.updatePoint([]);
    this.local.changeDirection('');
    this.store.dispatch(select_actions.emptyPlan());
  }

  public navigate(){
    this.store.dispatch(navigation.arrowNavigation());
  }

  public places(dest: string){
    this.router.navigate([{ outlets: 
      { sidebar: [ 'routes', 'places', dest] }}], 
      {queryParams: {module: dest + '_input'}
    });
  }

}
