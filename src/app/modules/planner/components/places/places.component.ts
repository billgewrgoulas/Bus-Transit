import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map, Observable, Subject, Subscription, take, tap } from 'rxjs';
import { DataShareService } from 'src/app/services/data-share.service';
import { DirectionsStore, TripState } from 'src/app/modules/planner/state/directions.store';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/Reducers/api-reducer';
import { spinner } from 'src/app/state/Selectors/appState.selectors';

@Component({
  selector: 'places-component',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit, OnDestroy {

  public value: string = '';
  public initValue$!: Observable<string>;
  public direction: string = 'start';
  public vm$!: Observable<any>;
  public spinner$!: Observable<boolean>;
  public subs: Subscription[] = [];

  constructor(
    private route: ActivatedRoute, 
    private local: DirectionsStore,
    private msg: DataShareService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {

    this.subs = [
      this.msg.dragStartObserver.subscribe(v => this.onDrag(v, 'start')),
      this.msg.dragEndObserver.subscribe(v => this.onDrag(v, 'dest'))
    ];

    this.vm$ = combineLatest([
      this.route.data, 
      this.local.state$,
    ]).pipe(
      take(1), 
      map(([data, state]) => ({data, state})), 
      tap(v => this.initStore(v.data['type'], v.state))
    );

    this.spinner$ = this.store.select(spinner);
  }

  ngOnDestroy(): void {
    this.local.changeDirection('');
    this.msg.dragOff();
    this.subs.forEach(s => s.unsubscribe());
  }

  public keyup(value: string){
    this.value = value;
    this.local.updateSearchText(value);
    if(this.value == ''){
      this.local.updatePoint([]);
    }
  }

  private initStore(direction: string, state: TripState){

    this.direction = direction;
    this.local.changeDirection(direction);

    if(direction == 'start' && state.start.length > 0){
      this.value = state.start[1];
    }else if(this.direction == 'dest' && state.destination.length > 0){
      this.value = state.destination[1];
    }

    if(direction == 'start'){
      this.initValue$ = this.local.getStartValue();
    }else if(direction == 'dest'){
      this.initValue$ = this.local.getEndValue();
    }
    
  }

  private onDrag(point: string[], direction: string){
    this.local.changeDirection(direction);
    this.local.updatePoint(point);
  }

}
